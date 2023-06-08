import api from '../axiosConfig';

async function updateTransactionBudgetMonth(txId: string, newBudgetMonth: string): Promise<number> {
  try {
    const response = await api.post<any[]>(`updateTransaction/${txId}/?budgetMonth=${newBudgetMonth}`, {});
    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default updateTransactionBudgetMonth;
