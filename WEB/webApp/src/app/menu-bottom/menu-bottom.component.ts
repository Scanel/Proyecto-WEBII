import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css']
})
export class MenuBottomComponent implements OnInit {

  @Input() stream: any;
  videoOn: boolean = true;
  audioOn: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
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

  Disconnect = () =>{
    window.close();
  }

}
