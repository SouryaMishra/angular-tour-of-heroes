import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Crisis } from "./crisis-center/crisis";
import { Hero } from "./heroes/hero";

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const heroes = [
      { id: 12, name: "Dr. Nice" },
      { id: 13, name: "Bombasto" },
      { id: 14, name: "Celeritas" },
      { id: 15, name: "Magneta" },
      { id: 16, name: "RubberMan" },
      { id: 17, name: "Dynama" },
      { id: 18, name: "Dr. IQ" },
      { id: 19, name: "Magma" },
      { id: 20, name: "Tornado" },
    ];

    const crises: Crisis[] = [
      { id: 1, name: "Dragon Burning Cities" },
      { id: 2, name: "Sky Rains Great White Sharks" },
      { id: 3, name: "Giant Asteroid Heading For Earth" },
      { id: 4, name: "Procrastinators Meeting Delayed Again" },
    ];
    return { heroes, crises };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
