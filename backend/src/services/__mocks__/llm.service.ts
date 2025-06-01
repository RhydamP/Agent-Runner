import { prisma } from "../../utils/prisma";
import redis from "../../utils/redis";

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