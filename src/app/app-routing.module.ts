import { NgModule } from '@angular/core';
import {SummarySalesComponent} from "./home/summary-sales/summary-sales.component"
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"empresas", component: SummarySalesComponent},
  {path:"",redirectTo:"empresas",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
