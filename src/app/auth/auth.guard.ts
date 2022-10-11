import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    console.log("AuthGuard#canActivate called");
    const url = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    console.log("AuthGuard#canActivateChild called");
    return this.canActivate(route, state);
  }

  /*
  As an alternative to using a CanActivate guard which redirects the user to a new page if they do not have access, 
  you can instead use a CanMatch guard to control whether the Router even attempts to activate a Route. 
  This allows you to have multiple Route configurations which share the same path but are matched based on different conditions. 
  In addition, this approach can allow the Router to match the wildcard Route instead.
*/
  canMatch(route: Route) {
    const url = `/${route.path}`;
    return this.checkLogin(url) === true;
  }

  checkLogin(redirectUrl: string) {
    if (this.authService.isLoggedIn) return true;
    this.authService.redirectUrl = redirectUrl;
    return this.router.parseUrl("/login");
  }
}
