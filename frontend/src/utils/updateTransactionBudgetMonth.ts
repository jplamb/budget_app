import api from '../axiosConfig';

async function updateTransactionBudgetMonth(txId: string, newBudgetMonth: string): Promise<number> {
  const response = await api.post<any[]>(`updateTransaction/${txId}/?budgetMonth=${newBudgetMonth}`, {});

  return response.status;
}

export default updateTransactionBudgetMonth;
