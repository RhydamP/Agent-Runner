// components/ResponseBox.tsx
'use client';

import { useState, useEffect } from 'react';

interface Props {
  response: string;
  loading: boolean;
}

export default function ResponseBox({ response, loading }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for response
  useEffect(() => {
    if (response && !loading) {
      setIsTyping(true);
      setDisplayedText('');
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < response.length) {
          setDisplayedText(response.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    }
  }, [response, loading]);

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-green-500/10 border border-white/20 dark:border-slate-700/50 min-h-[300px] transform transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Agent Response
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {loading ? 'Processing...' : response ? 'Completed' : 'Waiting for input'}
            </p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            loading 
              ? 'bg-yellow-500 animate-pulse' 
              : response 
              ? 'bg-green-500' 
              : 'bg-gray-300 dark:bg-gray-600'
          }`}></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {loading ? 'Processing' : response ? 'Ready' : 'Idle'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            {/* Animated loading spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            
            {/* Loading dots animation */}
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Agent is thinking...
            </p>
            
            {/* Progress bar */}
            <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : response ? (
          <div className="space-y-4">
            {/* Response content with typewriter effect */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white leading-relaxed overflow-wrap-anywhere whitespace-pre-wrap">
                    {displayedText}
                    {isTyping && (
                      <span className="inline-block w-2 h-5 bg-blue-600 ml-1 animate-pulse"></span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 rounded-lg transition-colors duration-200 text-sm font-medium text-green-700 dark:text-green-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Success</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            {/* Empty state illustration */}
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                Ready to assist
              </h4>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                Enter a prompt above and select a tool to get started. The AI agent will process your request and display the results here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}