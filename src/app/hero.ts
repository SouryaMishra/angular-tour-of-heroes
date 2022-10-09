import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

export interface Hero {
  id: number;
  name: string;
}

export type AddHeroRequest = Omit<Hero, "id">;
