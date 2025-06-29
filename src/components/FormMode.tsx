import React, { useState } from 'react';
import { CreditCard, DollarSign, Briefcase, TrendingUp, Target, User, Loader2, CheckCircle } from 'lucide-react';
import { LenderCards } from './LenderCards';
import { LoanFormData, FormErrors, LenderPredictionResponse } from '../types';
import { chatAPI } from '../api';

export const FormMode: React.FC = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loan_amount: 0,
    annual_income: 0,
    employment_status: 'salaried',
    credit_score: 700,
    loan_purpose: 'home',
    gender: 'male',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<LenderPredictionResponse | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.loan_amount || formData.loan_amount <= 0) {
      newErrors.loan_amount = 'Loan amount must be greater than 0';
    } else if (formData.loan_amount > 10000000) {
      newErrors.loan_amount = 'Loan amount cannot exceed ₹1 crore';
    }

    if (!formData.annual_income || formData.annual_income <= 0) {
      newErrors.annual_income = 'Annual income must be greater than 0';
    } else if (formData.annual_income > 100000000) {
      newErrors.annual_income = 'Annual income seems too high';
    }

    if (!formData.employment_status) {
      newErrors.employment_status = 'Please select employment status';
    }

    if (!formData.credit_score || formData.credit_score < 300 || formData.credit_score > 850) {
      newErrors.credit_score = 'Credit score must be between 300 and 850';
    }

    if (!formData.loan_purpose) {
      newErrors.loan_purpose = 'Please select loan purpose';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await chatAPI.predictLenders(formData);
      setResults(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (could add error state here)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoanFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setResults(null);
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Loan Recommendations Ready!</h2>
                  <p className="text-gray-600">Based on your profile, here are the best matches:</p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Modify Application
              </button>
            </div>
          </div>
          
          <LenderCards 
            lenders={results.top_lenders} 
            llmResponse={results.llm_response}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Loan Application Form</h1>
              <p className="text-gray-600">Fill out your details to get personalized loan recommendations</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Loan Amount */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                <span>Loan Amount (₹)</span>
              </label>
              <input
                type="number"
                value={formData.loan_amount || ''}
                onChange={(e) => handleInputChange('loan_amount', parseInt(e.target.value) || 0)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.loan_amount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter loan amount"
              />
              {errors.loan_amount && (
                <p className="mt-1 text-sm text-red-600">{errors.loan_amount}</p>
              )}
            </div>

            {/* Annual Income */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Annual Income (₹)</span>
              </label>
              <input
                type="number"
                value={formData.annual_income || ''}
                onChange={(e) => handleInputChange('annual_income', parseInt(e.target.value) || 0)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.annual_income ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter annual income"
              />
              {errors.annual_income && (
                <p className="mt-1 text-sm text-red-600">{errors.annual_income}</p>
              )}
            </div>

            {/* Employment Status */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Employment Status</span>
              </label>
              <select
                value={formData.employment_status}
                onChange={(e) => handleInputChange('employment_status', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.employment_status ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-employed</option>
                <option value="freelancer">Freelancer</option>
                <option value="student">Student</option>
              </select>
              {errors.employment_status && (
                <p className="mt-1 text-sm text-red-600">{errors.employment_status}</p>
              )}
            </div>

            {/* Credit Score */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Credit Score (300-850)</span>
              </label>
              <input
                type="number"
                min="300"
                max="850"
                value={formData.credit_score || ''}
                onChange={(e) => handleInputChange('credit_score', parseInt(e.target.value) || 0)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.credit_score ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter credit score"
              />
              {errors.credit_score && (
                <p className="mt-1 text-sm text-red-600">{errors.credit_score}</p>
              )}
            </div>

            {/* Loan Purpose */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4" />
                <span>Loan Purpose</span>
              </label>
              <select
                value={formData.loan_purpose}
                onChange={(e) => handleInputChange('loan_purpose', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.loan_purpose ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="home">Home</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="vehicle">Vehicle</option>
                <option value="startup">Startup</option>
                <option value="eco">Eco/Green</option>
                <option value="emergency">Emergency</option>
                <option value="gold-backed">Gold-backed</option>
              </select>
              {errors.loan_purpose && (
                <p className="mt-1 text-sm text-red-600">{errors.loan_purpose}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                <span>Gender</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Finding Best Matches...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Get Loan Recommendations</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};