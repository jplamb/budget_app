import api from '../axiosConfig';

async function updateTransactionCategory(txId: string, newCategory: string): Promise<number> {
  try {
    const response = await api.post<any[]>(`updateTransaction/${txId}/?category=${newCategory}`, {});

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default updateTransactionCategory;
