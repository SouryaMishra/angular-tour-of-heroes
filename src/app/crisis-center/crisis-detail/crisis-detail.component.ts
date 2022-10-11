import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Crisis } from "../crisis";
import { CrisisService } from "../crisis.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-crisis-detail",
  templateUrl: "./crisis-detail.component.html",
  styleUrls: ["./crisis-detail.component.css"],
})
export class CrisisDetailComponent implements OnInit {
  crisis?: Crisis;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService
  ) {}

  ngOnInit(): void {
    const crisisId = this.route.snapshot.paramMap.get("id");
    this.crisisService
      .getCrisis(Number(crisisId))
      .subscribe((crisis) => (this.crisis = crisis));

    //  this.crisis$ = this.route.paramMap.pipe(
    //    switchMap((params: ParamMap) => this.service.getCrisis(params.get("id")!))
    //  );
  }

  update() {
    if (this.crisis) {
      this.crisisService
        .updateCrisis(this.crisis)
        .subscribe(() => this.goToCrises());
    }
  }

  goToCrises() {
    this.router.navigate(["../", { id: this.crisis?.id }], {
      relativeTo: this.route,
    });
    // this.router.navigate(["../", { id: crisisId, foo: "foo" }], {
    //   relativeTo: this.route,
    // });
  }
}
