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
  