import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectComponent } from '../app/redirect/redirect.component';
import { LandingComponent } from '../app/landing/landing.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: ':id', component: RedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
