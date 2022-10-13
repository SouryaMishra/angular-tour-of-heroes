import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, mergeMap, Observable } from "rxjs";
import { Crisis } from "./crisis";
import { CrisisService } from "./crisis.service";

@Injectable({
  providedIn: "root",
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
  constructor(private crisisService: CrisisService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Crisis> | Observable<never> {
    const id = route.paramMap.get("id");
    // TODO: Fix this

    // return this.crisisService.getCrisis(parseInt(id!)).pipe(
    //   mergeMap((crisis) => {
    //     if (crisis) {
    //       return of(crisis);
    //     } else {
    //       // id not found
    //       this.router.navigate(["/crisis-center"]);
    //       return EMPTY;
    //     }
    //   })
    // );
    return EMPTY;
  }
}
