import { ApiError } from './apiError';

const MARATHI_MESSAGES: Record<string, string> = {
  'Invalid phone number or password': 'चुकीचा मोबाईल नंबर किंवा पासवर्ड. पुन्हा प्रयत्न करा.',
  'Unauthorized: no access token provided': 'कृपया पुन्हा लॉगिन करा.',
  'Invalid or expired access token': 'सत्र संपले आहे. कृपया पुन्हा लॉगिन करा.',
  'Session expired. Please login again.': 'सत्र संपले आहे. कृपया पुन्हा लॉगिन करा.',
  'Member not found': 'सभासद आढळला नाही.',
  'A member with this phone number or member number already exists':
    'या मोबाईल नंबर किंवा सभासद क्र. वर आधीच सभासद नोंदणीकृत आहे.',
  'Validation failed': 'एंट्रीची माहिती योग्य नाही. कृपया तपासून पुन्हा प्रयत्न करा.',
  'Cannot add repay amount: this member has no outstanding loan (loanDue is 0). Repay must be 0.':
    'परतफेड रक्कम जोडता येत नाही: या सभासदाचे आर्थिक सहाय्य बाकी ० आहे. परतफेड ० ठेवा.',
  'Too many requests, please try again later': 'खूप जास्त विनंत्या. थोड्या वेळाने पुन्हा प्रयत्न करा.',
};

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return MARATHI_MESSAGES[error.message] ?? error.message;
  }
  return 'काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.';
}
