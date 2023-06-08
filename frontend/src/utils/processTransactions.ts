import api from '../axiosConfig';

async function processTransactions(): Promise<number> {
  try {
    const response = await api.post<any[]>(`processTransactions/`, {});
    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default processTransactions;
