export interface Envelope {
  id: string;
  name: string;
  amount: number;
  dateUpdated: Date;
}

export interface NewEnvelope {
    name: string;
    amount: number;
}