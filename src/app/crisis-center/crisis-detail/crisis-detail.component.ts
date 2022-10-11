import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Crisis } from "../crisis";
import { CrisisService } from "../crisis.service";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-crisis-detail",
  templateUrl: "./crisis-detail.component.html",
  styleUrls: ["./crisis-detail.component.css"],
})
export class CrisisDetailComponent implements OnInit {
  // crisis?: Crisis;
  crisis$?: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService
  ) {}

  ngOnInit(): void {
    // const crisisId = this.route.snapshot.paramMap.get("id");
    // this.crisisService
    //   .getCrisis(Number(crisisId))
    //   .subscribe((crisis) => (this.crisis = crisis));

    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.crisisService.getCrisis(parseInt(params.get("id")!))
      )
    );
  }

  update(crisis: Crisis) {
    if (crisis) {
      this.crisisService
        .updateCrisis(crisis)
        .subscribe(() => this.goToCrises(crisis));
    }
  }

  goToCrises(crisis: Crisis) {
    this.router.navigate(["../", { id: crisis ? crisis.id : null }], {
      relativeTo: this.route,
    });
  }
}
