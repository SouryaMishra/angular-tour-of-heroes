import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComposeMessageComponent } from "./compose-message/compose-message.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
  {
    path: "compose",
    component: ComposeMessageComponent,
    outlet: "popup",
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
