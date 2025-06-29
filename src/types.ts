export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface LoanFormData {
  loan_amount: number;
  annual_income: number;
  employment_status: 'salaried' | 'self-employed' | 'freelancer' | 'student';
  credit_score: number;
  loan_purpose: 'home' | 'education' | 'business' | 'vehicle' | 'startup' | 'eco' | 'emergency' | 'gold-backed';
  gender: 'male' | 'female';
}

export interface Lender {
  name: string;
  interest_rate: number;
  match_score: number;
}

export interface LenderPredictionResponse {
  llm_response: string;
  top_lenders: Lender[];
}

export interface ChatResponse {
  reply: string;
}

export interface FormErrors {
  loan_amount?: string;
  annual_income?: string;
  employment_status?: string;
  credit_score?: string;
  loan_purpose?: string;
  gender?: string;
}