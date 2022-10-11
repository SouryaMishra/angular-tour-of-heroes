import { Component, OnInit } from "@angular/core";
import { Crisis } from "../crisis";
import { CrisisService } from "../crisis.service";
import { MessageService } from "../../message.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: "app-crisise-list",
  templateUrl: "./crisis-list.component.html",
  styleUrls: ["./crisis-list.component.css"],
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[] = [];
  // crises$?: Observable<Crisis[]>;
  selectedCrisisId?: number;

  constructor(
    private crisisService: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedCrisisId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.getCrises();

    // this.crises$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     this.selectedCrisisId = parseInt(params.get("id")!, 10);
    //     return this.crisisService.getCrises();
    //   })
    // );
  }

  getCrises(): void {
    this.crisisService
      .getCrises()
      .subscribe((crises) => (this.crises = crises));
  }

  add(crisisName: string) {
    if (!crisisName.trim()) return;
    this.crisisService
      .addCrisis({ name: crisisName })
      .subscribe((crisis) => this.crises.push(crisis));
  }

  delete(crisis: Crisis) {
    this.crises = this.crises.filter((c) => c !== crisis);
    this.crisisService.deleteCrisis(crisis.id).subscribe();
  }
}
