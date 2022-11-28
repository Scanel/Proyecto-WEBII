import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Avatar } from '../modelos/avatar.model';
import { PeerService } from '../peer.service';
import { AvatarService } from '../servicios/avatar.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: any;
  currentStream:any;
  currentAvatar:any;

  listUserAvatar:Array<any> = [];
  listUser:Array<any> = [];
  listMensaje: Array<any> = [];
  peer: PeerService;
  datos:any;
  resultados:any;

  chat:boolean = false;
  myForm: any;
  avatar: Avatar;

  chatCaja: AbstractControl;

  constructor(fb:FormBuilder, private toastr: ToastrService,private AvatarService: AvatarService, private router:Router, private route:ActivatedRoute, private webSocketService:WebSocketService, private peerService:PeerService) {
    this.roomName = route.snapshot.paramMap.get('id');
    this.myForm = fb.group({
      'chatCaja': ['', Validators.required],
    });
    this.chatCaja = this.myForm.controls['chatCaja'];
    this.peer = peerService;
    this.avatar = new Avatar();
    console.log(this.roomName);
   }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session === null){
      this.router.navigate(["login"]);
    }else{
      this.datos = JSON.parse(session);
      this.ConsultarAvatar();
      
      this.checkMediaDevices();
    }
    
  }

  initPeer = () =>{
    // const peer = this.peerService.peer;
    this.peer.peer.on('open',(id:any) =>{
      console.log("Entro a peer");
      const body = {
        idPeer:id,
        idStream:this.currentStream.id,
        roomName: this.roomName,
        nombre: this.datos.name,
        avatar: this.avatar
      }
      console.log("PEER conectado");
      console.log("BODY: ",body);
      this.webSocketService.joinRoom(body);
      this.webSocketService.SendMessage({"message": "Hola"})

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
        this.toastr.show(res.data.nombre + " se ha conectado");
        const idPeer = res.data.idPeer;
        console.log(res.data.avatar);
        this.addAvatarUser(res.data.avatar);
        const body = {
          total:this.listUserAvatar.length,
          avatar:this.currentAvatar
        }
        this.webSocketService.SendAvatar(body);
        this.sendCall(idPeer, this.currentStream);
      }else if(res.name === 'bye-user'){
        this.toastr.warning(res.data.nombre + " se ha desconectado");
        const idStream = res.data.idStream;
        const idAvatar = res.data.avatar.idAvatar;
        const filtro = this.listUser.filter(item => item.id !== idStream);
        const filtroAvatar = this.listUserAvatar.filter(item => item.idAvatar !== idAvatar);
        this.listUser = filtro;
        this.listUserAvatar = filtroAvatar;
      }else if(res.name === 'chat-user'){
        this.toastr.info(res.data.nombre + " ha enviado un mensaje");
        this.addMensaje(res.data);
      }else if(res.name === 'avatar-user'){
        if(res.data.total > this.listUserAvatar.length){
          this.addAvatarUser(res.data.avatar);
        }
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
        this.addAvatarUser(this.currentAvatar);
        
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

  addAvatarUser(avatar:any){
    this.listUserAvatar.push(avatar);
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

  ConsultarAvatar(){
    this.AvatarService.ConsultarAvatar(parseInt(this.datos.iduser)).subscribe(data => {
      this.resultados = data;
      if(this.resultados.status){
        this.avatar.idAvatar = data.data[0].idAvatar;
        this.avatar.iduser = data.data[0].iduser;
        this.avatar.urlBody = data.data[0].urlBody;
        this.avatar.urlEyes = data.data[0].urlEyes;
        this.avatar.urlFeet = data.data[0].urlFeet;
        this.avatar.urlHair = data.data[0].urlHair;
        this.avatar.urlLegs = data.data[0].urlLegs;
        this.avatar.urlSkin = data.data[0].urlSkin;
        this.currentAvatar = this.avatar;
      }else{
        this.toastr.error(this.resultados.message);
      }
      
    })
  }

  SetChat(chat: boolean){
    this.chat = chat;
  }

  onSubmit(form: any){
    this.chatCaja = this.myForm.controls["chatCaja"];
    const body = {
      nombre: this.datos.name,
      mensaje: this.chatCaja.value.toString()
    }
    this.addMensaje(body);
    this.webSocketService.SendMessage(body);

  }

  addMensaje(msj: any){
    this.listMensaje.push(msj);
  }
}
