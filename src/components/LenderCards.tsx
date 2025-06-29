import React from 'react';
import { CreditCard, TrendingUp, Award, Bot } from 'lucide-react';
import { Lender } from '../types';

interface LenderCardsProps {
  lenders: Lender[];
  llmResponse?: string;
}

export const LenderCards: React.FC<LenderCardsProps> = ({ lenders, llmResponse }) => {
  const getMatchColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getMatchIcon = (index: number) => {
    switch (index) {
      case 0: return <Award className="w-5 h-5 text-yellow-500" />;
      case 1: return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default: return <CreditCard className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {llmResponse && (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Bot className="w-5 h-5 mr-2 text-teal-600" />
            Loan Advisor Analysis
          </h3>
          <p className="text-gray-700 leading-relaxed">{llmResponse}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lenders.map((lender, index) => (
          <div
            key={`${lender.name}-${index}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getMatchIcon(index)}
                  <span className="text-sm font-medium text-gray-600">
                    #{index + 1} Match
                  </span>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-xs font-semibold border
                  ${getMatchColor(lender.match_score)}
                `}>
                  {Math.round(lender.match_score * 100)}%
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {lender.name}
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {lender.interest_rate.toFixed(1)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Match Score</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-500"
                        style={{ width: `${lender.match_score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {Math.round(lender.match_score * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  {lender.match_score >= 0.8 ? "Excellent match for your profile" :
                   lender.match_score >= 0.6 ? "Good match with competitive rates" :
                   "Consider for comparison"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};