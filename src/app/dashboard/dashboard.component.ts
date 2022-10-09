import { Component, OnInit } from "@angular/core";
import { Hero } from "../heroes/hero";
import { HeroService } from "../heroes/hero.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
