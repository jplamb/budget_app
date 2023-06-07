import api from '../axiosConfig';

async function updateTransactionCategory(txId: string, newCategory: string): Promise<number> {
  const response = await api.post<any[]>(`updateTransaction/${txId}/?category=${newCategory}`, {});

  return response.status;
}

export default updateTransactionCategory;
