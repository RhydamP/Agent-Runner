import OpenAI from 'openai';
import { prisma } from '../utils/prisma';
import redis from '../utils/redis';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// const GPT_Model = process.env.GPT_MODEL!;

// export async function getLLMResponse(tool: string, input: string): Promise<string> {

//   let systemPrompt: string;
//   let userPrompt: string;

//   if (tool === 'web-search') {
//     systemPrompt = 'You are a helpful assistant that summarizes web results.';
//     userPrompt = `Based on this search result,start with 'Based on my observation', summarize it in one paragraph upto 50-100 words like you're helping a friend: ${input}`;
//   } else if (tool === 'calculator') {
//     systemPrompt = 'You are a helpful assistant that explains simple calculations briefly.';
//     userPrompt = `Answer only with the result of this calculation with a starting 'The answer to your calculation is': ${input}`;
//   } else {
//     throw new Error('Unsupported tool');
//   }


//   try {
//     const chat = await openai.chat.completions.create({
//       model: GPT_Model,
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user', content: userPrompt },
//       ],
//     });

//     const response = chat.choices[0]?.message.content || 'No response from LLM.';
//     const tokenUsage = chat.usage?.total_tokens ?? null;

//     await prisma.run.create({
//       data: {
//         prompt: input,
//         tool,
//         response,
//         tokenUsage,
//       },
//     });
//     return response;
//   } catch (e) {
//     console.error('LLM Error:', e);
//     return userPrompt;
//   }
// }

export async function getLLMResponse(tool: string, input: string): Promise<string> {
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

  await new Promise((res) => setTimeout(res, 300));

  const randomIndex = Math.floor(Math.random() * responses.length);
  const response = responses[randomIndex];
  await prisma.run.create({
    data: {
      prompt: input,
      tool,
      response,
      tokenUsage: null,
    },
  });

  const redisEntry = {
    timestamp: new Date().toISOString(),
    tool,
    prompt: input,
    response,
  };

  await redis.lpush('recent_runs', JSON.stringify(redisEntry));
  await redis.ltrim('recent_runs', 0, 9);
  return response;
}
