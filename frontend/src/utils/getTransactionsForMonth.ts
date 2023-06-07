import api from '../axiosConfig';
import {Transaction} from "../Interfaces/Transaction";

async function getTransactionsForMonth(month: string): Promise<Transaction[]> {
  console.log(`fetching transactions for month ${month}`);
  const response = await api.get<any[]>(`getTransactionsByMonth/${month}/`, {});

  return response.data.map(tx => {
    return {
      id: tx.id,
      budgetMonth: tx.budget_month,
      date: new Date(tx.date),
      payee: tx.payee,
      type: tx.type,
      amount: Number(tx.amount),
      category: tx.category,
    };
  });
}

export default getTransactionsForMonth;
