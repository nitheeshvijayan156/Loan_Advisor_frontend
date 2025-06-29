import { LoanFormData, ChatResponse, LenderPredictionResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const chatAPI = {
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  },

  async predictLenders(formData: LoanFormData): Promise<LenderPredictionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/predict-lenders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Predict lenders API error:', error);
      throw new Error('Failed to get lender predictions. Please try again.');
    }
  }
};

export const extractPredictionData = (message: string): LoanFormData | null => {
  try {
    const readyIndex = message.indexOf('[READY_TO_PREDICT]');
    if (readyIndex === -1) return null;

    const jsonStart = message.indexOf('{', readyIndex);
    const jsonEnd = message.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) return null;

    const jsonStr = message.substring(jsonStart, jsonEnd);
    const data = JSON.parse(jsonStr);
    
    // Validate the structure
    if (data.loan_amount && data.annual_income && data.employment_status && 
        data.credit_score && data.loan_purpose && data.gender) {
      return data as LoanFormData;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting prediction data:', error);
    return null;
  }
};