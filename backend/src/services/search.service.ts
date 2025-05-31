// services/search.service.ts
import axios from 'axios';

const SERP_API_KEY = process.env.SERP_API_KEY!;

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export async function runWebSearch(prompt: string): Promise<SearchResult[]> {
  const url = 'https://serpapi.com/search.json';

  try {
    const response = await axios.get(url, {
      params: {
        engine: 'google',
        q: prompt,
        api_key: SERP_API_KEY,
      },
    });

    const organicResults = response.data.organic_results;

    if (!organicResults || !Array.isArray(organicResults) || organicResults.length === 0) {
      throw new Error('No search results found from SerpAPI.');
    }

    const filteredResults: SearchResult[] = organicResults
      .filter((r: any) => r.title && r.link && r.snippet)
      .map((r: any) => ({
        title: r.title,
        link: r.link,
        snippet: r.snippet,
      }));

    return filteredResults;
  } catch (err: any) {
    console.error('Error during SerpAPI call:', err.message);
    throw new Error('Failed to fetch search results.');
  }
}
