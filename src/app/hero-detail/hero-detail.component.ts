import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"],
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get("id");
    this.heroService
      .getHero(Number(heroId))
      .subscribe((hero) => (this.hero = hero));
  }

  goBack() {
    this.location.back();
  }

  @Input() hero?: Hero;
}
