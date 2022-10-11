import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
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

  checkLogin(redirectUrl: string) {
    if (this.authService.isLoggedIn) return true;
    this.authService.redirectUrl = redirectUrl;
    return this.router.parseUrl("/login");
  }
}
