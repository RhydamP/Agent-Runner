// components/SearchHistory.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ClockIcon, SearchIcon, CalculatorIcon } from 'lucide-react';
import { getHistory } from '@/lib/apiClient';

interface HistoryItem {
  timestamp: string;
  tool: 'web-search' | 'calculator';
  prompt: string;
  response: string;
}

export default function SearchHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory();
      setHistory(data);
      console.log(history);
    } catch (err) {
      setError('Failed to load search history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && history.length === 0) {
      fetchHistory();
    }
  }, [isOpen]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getToolIcon = (tool: string) => {
    return tool === 'web-search' ? (
      <SearchIcon className="w-4 h-4 text-blue-500" />
    ) : (
      <CalculatorIcon className="w-4 h-4 text-green-500" />
    );
  };

  return (
    <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Recent Search History
          </span>
          {history.length > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              {history.length}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-gray-200/50 dark:border-gray-700/50">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span>Loading history...</span>
              </div>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <button
                onClick={fetchHistory}
                className="mt-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline"
              >
                Retry
              </button>
            </div>
          ) : history.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No search history available
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors duration-150"
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getToolIcon(item.tool)}
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
                          {item.tool.replace('-', ' ')}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(item.timestamp)}
                      </span>
                    </div>

                    {/* Prompt */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Query:
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 break-words">
                        {item.prompt}
                      </p>
                    </div>

                    {/* Response */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Response:
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 break-words line-clamp-3">
                        {item.response}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}