import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../../message.service";

@Component({
  selector: "app-heroe-list",
  templateUrl: "./hero-list.component.html",
  styleUrls: ["./hero-list.component.css"],
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(heroName: string) {
    if (!heroName.trim()) return;
    this.heroService
      .addHero({ name: heroName })
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
