import { Component, OnInit } from "@angular/core";
import { Crisis } from "../crisis";
import { CrisisService } from "../crisis.service";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";

@Component({
  selector: "app-crisise-list",
  templateUrl: "./crisis-list.component.html",
  styleUrls: ["./crisis-list.component.css"],
})
export class CrisisListComponent implements OnInit {
  // crises: Crisis[] = [];
  crises$?: Observable<Crisis[]>;
  selectedCrisisId?: number;

  constructor(
    private crisisService: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.selectedCrisisId = parseInt(this.route.snapshot.paramMap.get("id")!);
    // this.getCrises();

    this.crises$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedCrisisId = parseInt(params.get("id")!);
        return this.crisisService.getCrises();
      })
    );
  }

  delete(crisis: Crisis) {
    // this.crises = this.crises.filter((c) => c !== crisis);
    // this.crisisService.deleteCrisis(crisis.id).subscribe();

    this.crisisService.deleteCrisis(crisis.id).subscribe(() => {
      this.crises$ = this.crises$?.pipe(
        map((crises) => crises.filter((c) => c.id !== crisis.id))
      );
    });
  }
}
