export interface Crisis {
  id: number;
  name: string;
}

export type AddCrisisRequest = Omit<Crisis, "id">;
