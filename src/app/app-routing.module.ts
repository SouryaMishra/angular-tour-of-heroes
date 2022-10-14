import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { ComposeMessageComponent } from "./compose-message/compose-message.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SelectivePreloadingStrategyService } from "./selective-preloading-strategy.service";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canLoad: [AuthGuard], // Can't preload because of canLoad guard even though preloadingStrategy is PreloadAllModules
  },
  {
    path: "crisis-center",
    loadChildren: () =>
      import("./crisis-center/crisis-center.module").then(
        (m) => m.CrisisCenterModule
      ),
    data: { preload: true },
  },
  { path: "", redirectTo: "/superheroes", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
  {
    path: "compose",
    component: ComposeMessageComponent,
    outlet: "popup",
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      // preloadingStrategy: PreloadAllModules,
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
