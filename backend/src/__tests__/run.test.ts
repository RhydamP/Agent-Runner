import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import app from '../app';

jest.mock('../services/__mocks__/llm.service');

describe('POST /run', () => {
  it('should return a friendly LLM message for a calculator input', async () => {
    const response = await request(app).post('/run').send({
      prompt: '2+2*2',
      tool: 'calculator',
    });
    console.log('👀 Response:', response.body); 
    expect(response.status).toBe(200);
    expect(response.body.result).toMatch(/Sure|equals|final|crunching|Calculation/i);
  });

  it('should return a friendly LLM message for a search input', async () => {
    const response = await request(app).post('/run').send({
      prompt: 'What is a Developer Tool',
      tool: 'web-search',
    });
    console.log('👀 Response:', response.body); 
    expect(response.status).toBe(200);
    expect(response.body.result).toMatch(/Based on my observation/i);
}, 15000);

  it('should reject invalid prompt (too long)', async () => {
    const longPrompt = 'a'.repeat(600);
    const response = await request(app).post('/run').send({
      prompt: longPrompt,
      tool: 'calculator',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should reject invalid tool', async () => {
    const response = await request(app).post('/run').send({
      prompt: '2+2',
      tool: 'invalid-tool',
    });

    expect(response.status).toBe(400);
  });
});
