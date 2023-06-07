export interface Transaction {
  id: string;
  budgetMonth: string;
  date: Date;
  payee: string;
  type: number;
  amount: number;
  category: string;
}
