import api from '../axiosConfig';
import {NewEnvelope} from "../Interfaces/Envelope";

async function createEnvelope(envelope: NewEnvelope): Promise<number> {
  console.log(`fetching savings envelopes`);
  try {
    const response = await api.post<any[]>(`envelopes/`, {
      amount: envelope.amount,
      name: envelope.name,
    });

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default createEnvelope;
