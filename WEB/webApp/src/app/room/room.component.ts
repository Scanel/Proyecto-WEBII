import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class RoomComponent implements OnInit, OnDestroy {

  roomName: any;

  currentStream:any;

  currentAvatar:any;

  listUserAvatar:Array<any> = [];

  listUser:Array<any> = [];

  listMensaje: Array<any> = [];

  listTareas: Array<any> = [];

  listRespuestas: Array<any> = [];

  peer: PeerService;

  datos:any;

  resultados:any;

  chat:boolean = false;

  tareas:boolean = false;

  myForm: any;

  myForm2: any;

  avatar: Avatar;

  chatCaja: AbstractControl;

  respuesta: AbstractControl;

  constructor(fb:FormBuilder, private toastr: ToastrService,private AvatarService: AvatarService, private router:Router, private route:ActivatedRoute, private webSocketService:WebSocketService, private peerService:PeerService) {
    this.roomName = route.snapshot.paramMap.get('id');
    this.myForm = fb.group({
      'chatCaja': ['', Validators.required],
    });
    this.myForm2 = fb.group({
      'respuesta': ['', Validators.required]
    });
    this.respuesta = this.myForm2.controls['respuesta'];
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
  ngOnDestroy(): void {
      console.log("Destruir");
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

      this.webSocketService.joinRoom(body);

      this.peer.peer.on('call', (callEnter:any) => {
        callEnter.answer(this.currentStream);
        callEnter.on('stream', (streamRemote:any) => {
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
      }else if(res.name === 'tarea-user'){
        this.toastr.warning("Tienes una nueva actividad");
        this.addTareas(res.data);
        console.log(this.listTareas[0].titulo);
      }else if(res.name === 'respuesta-user'){
        console.log("hay respuestaaaaaaa");
        console.log(res.data);
        this.toastr.info(res.data.nombre + " ha contestado la actividad");
        this.addRespuesta(res.data);
      }
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
  }

  addAvatarUser(avatar:any){
    this.listUserAvatar.push(avatar);
  }

  addTareas(tarea:any){
    this.listTareas.push(tarea);
  }

  sendCall = (idPeer:any, stream:any) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    newUserCall.on('stream', (userStream: any) => {
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
    this.tareas = false;
  }

  SetTareas(tareas: boolean){
    this.tareas = tareas;
    this.chat = false;
  }

  onSubmit(form: any){
    this.chatCaja = this.myForm.controls["chatCaja"];
    const body = {
      nombre: this.datos.name,
      mensaje: this.chatCaja.value.toString()
    }
    this.addMensaje(body);
    this.webSocketService.SendMessage(body);
    this.LimpiarInputs();
  }

  onSubmit2(form: any){
    this.respuesta = this.myForm2.controls['respuesta'];
    const body = {
      nombre: this.datos.name,
      respuesta: this.respuesta.value
    }
    this.addRespuesta(body);
    this.webSocketService.SendRespuesta(body);

    this.toastr.success("Enviaste la respuesta");

  }

  LimpiarInputs(): void{
    this.myForm.patchValue({
      'chatCaja': ''
    });
  }
  addMensaje(msj: any){
    this.listMensaje.push(msj);
  }
  addRespuesta(res: any){
    this.listRespuestas.push(res);
  }
}
