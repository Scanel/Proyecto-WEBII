import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css']
})
export class MenuBottomComponent implements OnInit {

  @Input() stream: any;
  @Input() idrol: any;
  @Output() setChat = new EventEmitter<boolean>();
  @Output() setTareas = new EventEmitter<boolean>();
  videoOn: boolean = true;
  audioOn: boolean = false;
  chatOn: boolean = false;
  tareasOn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.idrol);
  }

  SetVideo = () =>{
    this.stream.getTracks().forEach((track: MediaStreamTrack) => {
      console.log(track);
      if(track.enabled && track.kind === 'video') {
        track.enabled = false;
        this.videoOn = false;
      }else if(!track.enabled && track.kind === 'video'){
        track.enabled = true;
        this.videoOn = true;
      }
    });
  }

  SetAudio = () => {
    this.stream.getTracks().forEach((track: MediaStreamTrack) => {
      if(track.enabled && track.kind === 'audio'){
        track.enabled = false;
        this.audioOn = false;
      }else if(!track.enabled && track.kind === 'audio'){
        track.enabled = true;
        this.audioOn = true;
      }
      console.log(track);
    })
  }

  SetChat = () => {
    this.chatOn = !this.chatOn;
    this.setChat.emit(this.chatOn);
  }

  SetTareas = () => {
    this.tareasOn = !this.tareasOn;
    this.setTareas.emit(this.tareasOn);
  }

  Disconnect = () =>{
    window.close();
  }

}
