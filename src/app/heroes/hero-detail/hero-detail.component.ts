import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

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

  update() {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goToHeroes());
    }
  }

  goToHeroes() {
    this.router.navigate(["heroes", { id: this.hero?.id }]);
  }
}
