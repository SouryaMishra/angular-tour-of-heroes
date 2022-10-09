import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrisisListComponent } from "./crisis-list/crisis-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "crisis-center", component: CrisisListComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
