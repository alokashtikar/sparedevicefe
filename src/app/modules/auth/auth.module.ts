import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from "@angular/router";
import {AmplifyUIAngularModule} from "@aws-amplify/ui-angular";

export const routes = [
  {
    path: '',
    component: LoginComponent,
    children: [],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AmplifyUIAngularModule,
  ]
})
export class AuthModule {
}
