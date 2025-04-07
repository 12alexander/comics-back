export interface AuthResult {
  success: boolean;
  status: number;
  message?: string;
  token?: string;
  userName?: string;
}

export interface ComicData {
  title: string;  
  year: number;
  description: string;
  url: string;
  amount: number;
  price: number;
}

export interface PurchaseResult {
  success: boolean;
  status: number;
  message: string;
  purchase?: any;
}

