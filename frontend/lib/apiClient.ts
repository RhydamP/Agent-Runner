// lib/apiClient.ts

export async function runPrompt(prompt: string, tool: 'calculator' | 'web-search') {
  const res = await fetch('/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, tool }),
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const json: { result: string } = await res.json();
  return json;
}

export async function getHistory(): Promise<HistoryItem[]> {
  const res = await fetch('/run/history', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) throw new Error('Failed to fetch');
  const historyItems: HistoryItem[] =  await res.json();
  return historyItems;
}
