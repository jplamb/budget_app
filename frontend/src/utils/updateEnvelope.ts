import api from '../axiosConfig';
import {Envelope} from "../Interfaces/Envelope";

async function updateEnvelope(envelope: Envelope): Promise<number> {
  console.log(`updating savings envelope`);
  try {
    const response = await api.patch<any[]>(`envelopes/${envelope.id}/`, {
      id: envelope.id,
      amount: envelope.amount,
      name: envelope.name,
    });

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default updateEnvelope;
