import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { MenuBottomComponent } from './menu-bottom/menu-bottom.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AvatarComponent } from './avatar/avatar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PersonalizarAvatarComponent } from './personalizar-avatar/personalizar-avatar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CartaClaseComponent } from './carta-clase/carta-clase.component';
import { CrearRoomComponent } from './crear-room/crear-room.component';
import { UnirseRoomComponent } from './unirse-room/unirse-room.component';
import { ChatComponent } from './chat/chat.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { RoomComponenteComponent } from './room-componente/room-componente.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ActividadComponent } from './actividad/actividad.component';


const config: SocketIoConfig = {url: 'https://server-sockets-production.up.railway.app/', options: {withCredentials: false}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    VideoPlayerComponent,
    MenuBottomComponent,
    AvatarComponent,
    LoginComponent,
    RegistroComponent,
    PersonalizarAvatarComponent,
    CartaClaseComponent,
    CrearRoomComponent,
    UnirseRoomComponent,
    ChatComponent,
    CuentaComponent,
    RoomComponenteComponent,
    ActividadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
