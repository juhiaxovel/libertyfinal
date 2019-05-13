/**
* Author: ShepHertz
* Routing of components
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyValidateComponent } from './policy-validate/policy-validate.component';
import { SliderFormComponent } from './slider-form/slider-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {path: '', component: PolicyValidateComponent},
  {path: 'subscribe', component: SliderFormComponent},
  {path: 'confirmed', component: ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
