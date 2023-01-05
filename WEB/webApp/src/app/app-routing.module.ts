import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RoomComponenteComponent } from './room-componente/room-componente.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'room/:id',
    component: RoomComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
    
  },
  {
    path: 'room',
    component: RoomComponenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
