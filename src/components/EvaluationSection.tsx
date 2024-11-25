import React from 'react';
import { Category } from '../types';

interface Props {
  categories: Category[];
  handleScoreChange: (categoryIndex: number, subcategoryIndex: number, value: number) => void;
}

export const EvaluationSection: React.FC<Props> = ({ categories, handleScoreChange }) => (
  <div className="p-6">
    <div className="grid gap-8">
      {categories.map((category, categoryIndex) => (
        <div 
          key={category.name}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <category.icon className="h-7 w-7 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500">Weight: {category.weight}%</p>
            </div>
          </div>
          <div className="space-y-4">
            {category.subcategories.map((subcategory, subcategoryIndex) => (
              <div 
                key={subcategory.name}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{subcategory.name}</p>
                  <p className="text-xs text-gray-500">Weight: {subcategory.weight}%</p>
                </div>
                <select
                  value={subcategory.score}
                  onChange={(e) => handleScoreChange(categoryIndex, subcategoryIndex, Number(e.target.value))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {[0, 1, 2, 3, 4, 5].map((score) => (
                    <option key={score} value={score}>
                      {score} - {getScoreLabel(score)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const getScoreLabel = (score: number): string => {
  switch (score) {
    case 0: return 'Poor';
    case 1: return 'Below Average';
    case 2: return 'Average';
    case 3: return 'Good';
    case 4: return 'Very Good';
    case 5: return 'Excellent';
    default: return '';
  }
};