import api from '../axiosConfig';

async function processTransactions(): Promise<number> {
  const response = await api.post<any[]>(`processTransactions/`, {});

  return response.status;
}

export default processTransactions;
