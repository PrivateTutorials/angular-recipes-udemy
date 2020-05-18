import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserCompone } from './user/user.compone';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/:id', component: UserCompone}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModu {

}
