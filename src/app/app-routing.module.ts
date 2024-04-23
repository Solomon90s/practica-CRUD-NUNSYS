import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./components/inicio/inicio.component";
import {UsuariosComponent} from "./components/usuarios/usuarios.component";

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
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
