// components/PromptForm.tsx
'use client';

import { useState } from 'react';


export default function PromptForm({ onSubmit }: FormProps) {
  const [prompt, setPrompt] = useState('');
  const [tool, setTool] = useState<Tool>('calculator');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, tool);
    }
  };

  const characterCount = prompt.length;
  const maxLength = 500;
  const progressPercentage = (characterCount / maxLength) * 100;

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/10 border border-white/20 dark:border-slate-700/50 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Create Your Query
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter your prompt and choose the appropriate tool
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textarea with enhanced styling */}
        <div className="relative">
          <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
            <textarea
              className="w-full bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 rounded-2xl p-4 pr-16 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none hover:border-gray-300 dark:hover:border-slate-500"
              rows={4}
              placeholder="Enter your prompt here... (e.g., 'Calculate 15% of 250' or 'Search for latest AI news')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={maxLength}
            />
            
            {/* Character counter with progress ring */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-300 dark:text-gray-600"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${progressPercentage * 0.754} ${75.4 - progressPercentage * 0.754}`}
                    className={`transition-all duration-300 ${
                      progressPercentage > 80 
                        ? 'text-red-500' 
                        : progressPercentage > 60 
                        ? 'text-yellow-500' 
                        : 'text-blue-500'
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xs font-medium ${
                    progressPercentage > 80 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {characterCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Selection with animated cards */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Choose Tool
          </label>
          <div className="grid grid-cols-2 gap-4">
            {/* Calculator Option */}
            <div
              className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                tool === 'calculator' 
                  ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/25' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setTool('calculator')}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm sm:text-xs font-medium text-gray-800 dark:text-white">Calculator</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Math operations</div>
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="tool"
                value="calculator"
                checked={tool === 'calculator'}
                onChange={(e) => setTool(e.target.value as Tool)}
                className="sr-only"
              />
            </div>

            {/* Web Search Option */}
            <div
              className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                tool === 'web-search' 
                  ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/25' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setTool('web-search')}
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Web Search</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Internet lookup</div>
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="tool"
                value="web-search"
                checked={tool === 'web-search'}
                onChange={(e) => setTool(e.target.value as Tool)}
                className="sr-only"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!prompt.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
        >
          <span>Run Agent</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </form>
    </div>
  );
}