interface HistoryItem {
  timestamp: string;
  tool: 'web-search' | 'calculator';
  prompt: string;
  response: string;
}

interface Props {
  response: string;
  loading: boolean;
}

type Tool = 'calculator' | 'web-search';

interface FormProps {
  onSubmit: (prompt: string, tool: Tool) => void;
}