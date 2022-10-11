import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  // hero$?: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get("id");
    this.heroService
      .getHero(Number(heroId))
      .subscribe((hero) => (this.hero = hero));

    //  this.hero$ = this.route.paramMap.pipe(
    //    switchMap((params: ParamMap) => this.service.getHero(params.get("id")!))
    //  );
  }

  update(hero: Hero) {
    if (hero) {
      this.heroService.updateHero(hero).subscribe(() => this.goToHeroes(hero));
    }
  }

  goToHeroes(hero: Hero) {
    this.router.navigate(["heroes", { id: hero ? hero.id : null }]);
  }
}
