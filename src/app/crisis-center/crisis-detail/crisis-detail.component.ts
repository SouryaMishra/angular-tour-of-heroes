import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Crisis } from "../crisis";
import { CrisisService } from "../crisis.service";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { DialogService } from "src/app/dialog.service";

@Component({
  selector: "app-crisis-detail",
  templateUrl: "./crisis-detail.component.html",
  styleUrls: ["./crisis-detail.component.css"],
})
export class CrisisDetailComponent implements OnInit {
  crisis!: Crisis;
  // crisis$?: Observable<Crisis>;
  editName = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // v1
    // const crisisId = this.route.snapshot.paramMap.get("id");
    // this.crisisService
    //   .getCrisis(Number(crisisId))
    //   .subscribe((crisis) => (this.crisis = crisis));

    // v2
    // this.crisis$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.crisisService.getCrisis(parseInt(params.get("id")!))
    //   )
    // );

    // v3
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.crisisService.getCrisis(parseInt(params.get("id")!))
        )
      )
      .subscribe((crisis) => {
        if (!crisis) {
          this.goToCrises(crisis);
          return;
        }
        this.crisis = crisis;
        this.editName = crisis.name;
      });
  }

  update(crisis: Crisis) {
    if (this.editName) {
      this.crisisService
        .updateCrisis({ id: crisis.id, name: this.editName })
        .subscribe(() => {
          this.crisis.name = this.editName;
          this.goToCrises(crisis);
        });
    }
  }

  goToCrises(crisis: Crisis) {
    this.router.navigate(["../", { id: crisis ? crisis.id : null }], {
      relativeTo: this.route,
    });
  }

  // Component specific canDeactivate guard
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm("Discard changes?");
  }
}
