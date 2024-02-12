import { Routes } from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ResultComponent } from "./pages/result/result.component";

export const routes: Routes = [
//  { path: "login", component: LoginComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "result", component: ResultComponent },
  { path: "", redirectTo: "/homepage", pathMatch: "full" },
];
