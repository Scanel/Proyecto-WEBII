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

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {withCredentials: false}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    VideoPlayerComponent,
    MenuBottomComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
