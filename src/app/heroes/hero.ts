export interface Hero {
  id: number;
  name: string;
}

export type AddHeroRequest = Omit<Hero, "id">;
