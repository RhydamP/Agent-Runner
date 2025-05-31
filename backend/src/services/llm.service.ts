// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function getLLMResponse(tool: string, input: any): Promise<string> {
//   if (tool === 'calculator') {
//     return `The answer to your calculation is ${input}.`;
//   }

//   // Handle SearchResult[]
//   if (Array.isArray(input)) {
//     const formatted = input.slice(0, 3).map((res, i) =>
//       `${i + 1}. ${res.title} (${res.link}) — ${res.snippet}`
//     ).join('\n');

//     const prompt = `Based on my search, here are some results:\n\n${formatted}`;

//     try {
//       const chat = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant.' },
//           { role: 'user', content: prompt },
//         ],
//       });

//       return chat.choices[0]?.message.content || 'No response from LLM.';
//     } catch (e) {
//       console.error('LLM Error:', e);
//       return prompt; // fallback to plain response
//     }
//   }

//   return 'Unsupported input for LLM.';
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
    `Based on my search, here's the best result I found: ${input}`,
    `I looked it up and found this: ${input}`,
    `Here’s what came up when I searched: ${input}`,
    `Top search result: ${input}`,
    `Found this through search: ${input}`
  ];

  const responses = tool === 'calculator' ? calculatorResponses : searchResponses;

  await new Promise((res) => setTimeout(res, 300)); // Simulate delay

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}
