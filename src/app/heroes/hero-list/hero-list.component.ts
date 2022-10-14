import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../../message.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: "app-hero-list",
  templateUrl: "./hero-list.component.html",
  styleUrls: ["./hero-list.component.css"],
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  // heroes$?: Observable<Hero[]>;
  selectedHeroId?: number;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedHeroId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.getHeroes();

    // this.heroes$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     this.selectedHeroId = parseInt(params.get("id")!, 10);
    //     return this.heroService.getHeroes();
    //   })
    // );
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
