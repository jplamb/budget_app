import api from '../axiosConfig';
import {Envelope} from "../Interfaces/Envelope";

async function deleteEnvelope(envelope: Envelope): Promise<number> {
  console.log(`deleting savings envelope`);
  try {
    const response = await api.delete<any[]>(`envelopes/${envelope.id}/`, {});
    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default deleteEnvelope;
