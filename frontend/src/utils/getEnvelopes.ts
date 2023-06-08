import api from '../axiosConfig';
import {Envelope} from "../Interfaces/Envelope";

async function getEnvelopes(): Promise<Envelope[]> {
  console.log(`fetching savings envelopes`);
  try {
    const response = await api.get<any[]>(`envelopes/`, {});
    console.log(response)

    return response.data.map(envelope => {
      return {
        id: envelope.id,
        name: envelope.name,
        amount: envelope.amount,
        dateUpdated: new Date(envelope.date_updated)
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getEnvelopes;
