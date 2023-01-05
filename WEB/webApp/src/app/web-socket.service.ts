import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  events = ['new-user', 'bye-user', 'chat-user', 'avatar-user', 'tarea-user', 'respuesta-user'];
  public cbEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private socket: Socket) { 
    this.listener();
  }

  listener = () =>{
    this.events.forEach(eventName => {
      this.socket.on(eventName, (data: any) => this.cbEvent.emit({
        name: eventName,
        data
      }));
    });
  }

  joinRoom = (data: any) =>{
    this.socket.emit('join', data);
  }

  SendMessage = (data: any) =>{
    this.socket.emit('chat', data);
  }

  SendAvatar = (data:any) => {
    this.socket.emit('avatar', data);
  }

  SendTarea = (data:any) => {
    this.socket.emit('tarea', data);
  }

  SendRespuesta = (data:any) => {
    this.socket.emit('respuesta', data);
  }
}
