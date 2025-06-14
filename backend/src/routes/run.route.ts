// routes/run.route.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getLLMResponse } from '../services/llm.service';
import { evaluateExpression } from '../services/calculator.service';
import { runWebSearch } from '../services/search.service';
import redis from '../utils/redis';

const router = Router();

const requestSchema = z.object({
    prompt: z.string().min(1).max(500),
    tool: z.enum(['calculator', 'web-search']),
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const parse = requestSchema.safeParse(req.body);
    if (!parse.success) {
        console.warn('❌ Validation failed:', parse.error.errors);
        res.status(400).json({ error: parse.error.errors });
        return;
    }

    const { prompt, tool } = parse.data;

    try {
        let rawResult: string;

        if (tool === 'calculator') {
            rawResult = evaluateExpression(prompt);
        } else {
            const searchResults = await runWebSearch(prompt);
            if (!searchResults.length) {
                throw new Error('No search results returned.');
            }
            const top = searchResults[0];
            rawResult = `${top.title} - ${top.link} | ${top.snippet}`;
        }

        const final = await getLLMResponse(tool, rawResult);
        console.log('💬 Final Response:', final);
        res.json({ result: final });
    } catch (err) {
        res.status(500).json({ error: 'Internal error', details: err });
    }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const items = await redis.lrange('recent_runs', 0, 9); 
    const parsed = items.map((item) => JSON.parse(item));
    res.json(parsed);
  } catch (err) {
    console.error('❌ Redis fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch Redis history' });
  }
});



export default router;
