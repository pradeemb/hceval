import React from 'react';

interface Props {
  score: number;
}

export const TotalScore: React.FC<Props> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-blue-100 text-blue-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 75) return 'Strong';
    if (score >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Total Score</h3>
          <p className="text-sm text-gray-500">Overall candidate assessment</p>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreColor(score)}`}>
            <span className="text-2xl font-bold">{score}%</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-600">{getScoreLabel(score)}</p>
        </div>
      </div>
    </div>
  );
};