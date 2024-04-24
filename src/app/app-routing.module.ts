import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./components/inicio/inicio.component";
import {UserListComponent} from "./components/entities/user-list/user-list.component";
import {UserFormComponent} from "./components/entities/user-form/user-form.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo:'/inicio'
  },
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path:'usuarios',
    component: UserListComponent
  },
  {
    path:'usuarios/:id',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
