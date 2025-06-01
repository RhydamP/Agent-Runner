// app/page.tsx
'use client';

import { useState } from 'react';
import PromptForm from '@/components/PromptForm';
import ResponseBox from '@/components/ResponseBox';
import SearchHistory from '@/components/SearchHistory';
import { runPrompt } from '@/lib/apiClient';

export default function HomePage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async (prompt: string, tool: 'calculator' | 'web-search') => {
    setLoading(true);
    setResponse('');
    try {
      const data = await runPrompt(prompt, tool);
      setResponse(data.result);
    } catch (error) {
      setResponse('Something went wrong.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Top Section - Header Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Header Section - Left */}
          <div className="flex flex-col justify-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Alpha Runner
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Harness the power of AI agents to calculate complex problems and search the web with intelligent precision
            </p>

            {/* Feature Pills - Moved under header */}
            <div className="flex flex-wrap gap-4 opacity-60">
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-1000"></div>
                <span>Smart Web Search</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-2000"></div>
                <span>Advanced Calculator</span>
              </div>
            </div>
          </div>

          {/* Form Section - Right */}
          <div className="flex flex-col justify-center">
            <PromptForm onSubmit={handleRun} />
          </div>
        </div>

        {/* Response Section - Full Width Below */}
        <div className="w-full space-y-6">
          <ResponseBox response={response} loading={loading} />
          <SearchHistory />
        </div>
      </main>
    </div>
  );
}