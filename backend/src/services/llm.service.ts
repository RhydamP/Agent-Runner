import OpenAI from 'openai';
import { prisma } from '../utils/prisma';
import redis from '../utils/redis';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GPT_MODEL = process.env.GPT_MODEL || 'gpt-4o-mini';

const openai = OPENAI_API_KEY
  ? new OpenAI({ apiKey: OPENAI_API_KEY })
  : null;

async function getRealLLMResponse(tool: string, input: string): Promise<string> {
  let systemPrompt: string;
  let userPrompt: string;

  if (tool === 'web-search') {
    systemPrompt = 'You are a helpful assistant that summarizes web results.';
    userPrompt = `Based on this search result, start with 'Based on my observation', summarize it in one paragraph (50–100 words) like you're helping a friend: ${input}`;
  } else if (tool === 'calculator') {
    systemPrompt = 'You are a helpful assistant that explains simple calculations briefly.';
    userPrompt = `Answer only with the result of this calculation starting with 'The answer to your calculation is': ${input}`;
  } else {
    throw new Error('Unsupported tool');
  }

  const chat = await openai!.chat.completions.create({
    model: GPT_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  const response = chat.choices[0]?.message.content || 'No response from LLM.';
  const tokenUsage = chat.usage?.total_tokens ?? null;

  await prisma.run.create({
    data: {
      prompt: input,
      tool,
      response,
      tokenUsage,
    },
  });

  return response;
}

async function getMockLLMResponse(tool: string, input: string): Promise<string> {
  const calculatorResponses = [
    `Sure! The answer is ${input}.`,
    `After crunching the numbers, it's ${input}.`,
    `You got it! That equals ${input}.`,
    `Calculation complete: ${input}.`,
    `Final result: ${input}.`
  ];

  const searchResponses = [
    `Based on my observation: ${input}`
  ];

  const responses = tool === 'calculator' ? calculatorResponses : searchResponses;

  await new Promise((res) => setTimeout(res, 300)); // Simulate latency
  const response = responses[Math.floor(Math.random() * responses.length)];

  await prisma.run.create({
    data: {
      prompt: input,
      tool,
      response,
      tokenUsage: null,
    },
  });

  await redis.lpush('recent_runs', JSON.stringify({
    timestamp: new Date().toISOString(),
    tool,
    prompt: input,
    response,
  }));

  await redis.ltrim('recent_runs', 0, 9);
  return response;
}

export async function getLLMResponse(tool: string, input: string): Promise<string> {
  try {
    if (openai) {
      return await getRealLLMResponse(tool, input);
    } else {
      return await getMockLLMResponse(tool, input);
    }
  } catch (e) {
    console.error('LLM Error:', e);
    return `An error occurred while processing the input: ${input}`;
  }
}
