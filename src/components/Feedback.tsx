import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props {
  feedback: string;
  setFeedback: (feedback: string) => void;
}

export const Feedback: React.FC<Props> = ({ feedback, setFeedback }) => {
  return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Interviewer Feedback</h3>
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback about the candidate here..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};