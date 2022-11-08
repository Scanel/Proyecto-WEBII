import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeerService } from '../peer.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: any;
  currentStream:any;
  listUserVideo: Array<any> = [];
  listUser:Array<any> = [];
  peer: PeerService;

  constructor(private route:ActivatedRoute, private webSocketService:WebSocketService, private peerService:PeerService) {
    this.roomName = route.snapshot.paramMap.get('id');
    this.peer = peerService;
    console.log(this.roomName);
   }

  ngOnInit(): void {
    this.checkMediaDevices();
  }

  initPeer = () =>{
    // const peer = this.peerService.peer;
    this.peer.peer.on('open',(id:any) =>{
      console.log("Entro a peer");
      const body = {
        idPeer:id,
        idStream:this.currentStream.id,
        roomName: this.roomName
      }
      console.log("PEER conectado");
      console.log("BODY: ",body);
      this.webSocketService.joinRoom(body);

      this.peer.peer.on('call', (callEnter:any) => {
        console.log("Nueva llamada");
        callEnter.answer(this.currentStream);
        callEnter.on('stream', (streamRemote:any) => {
          console.log("Stream remoto: ",streamRemote);
          this.addVideoUser(streamRemote);
        })
      }, (err:any) => {
        console.log("ERROR Peer call ", err);
      });
    })
  }

  initSocket = () =>{
    this.webSocketService.cbEvent.subscribe((res:any) => {
      if(res.name === 'new-user'){
        console.log("El servidor me mandó algo");
        const idPeer = res.data.idPeer;
        console.log("Usuario: ", idPeer);
        this.sendCall(idPeer, this.currentStream);
      }else if(res.name === 'bye-user'){
        console.log("Usuario desconectado");
        const idStream = res.data.idStream;
        const filtro = this.listUser.filter(item => item.id !== idStream);
        this.listUser = filtro;
      }
      console.log("SOCKET", res);
    })
  }

  checkMediaDevices=()=>{

    if(navigator && navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then((stream) =>{
        this.currentStream = stream;
        this.addVideoUser(stream);
        // const peer = this.peerService.peer;
        
        this.peer.StartPeer();
        this.initPeer();
        this.initSocket();

      }).catch(() =>{
        console.log("No tiene permisos");
      })
    }else{
      console.log("Not Media Devices");
    }
  }

  addVideoUser=(stream:any) =>{
    this.listUser.push(stream);
    console.log(this.listUser);
  }

  sendCall = (idPeer:any, stream:any) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    console.log("Usuario: ", idPeer);
    console.log("Stream: ",stream);
    newUserCall.on('stream', (userStream: any) => {
      console.log("Usuario stream: ",userStream);
      this.addVideoUser(userStream);
    })
  }
  
}
