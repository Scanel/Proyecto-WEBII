import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../modelos/room.model';
import { RoomUser } from '../modelos/roomuser.model';
import { EventosService } from '../servicios/eventos.service';
import { RoomService } from '../servicios/room.service';
import { RoomuserService } from '../servicios/roomuser.service';

@Component({
  selector: 'app-crear-room',
  templateUrl: './crear-room.component.html',
  styleUrls: ['./crear-room.component.css']
})
export class CrearRoomComponent implements OnInit {

  myForm: any;
  name: AbstractControl;
  materia: AbstractControl;

  room: Room;
  roomuser: RoomUser;
  datos: any;
  resultado:any;

  constructor(fb: FormBuilder, private router: Router, private RoomService: RoomService, private toastr: ToastrService, private RoomUserService: RoomuserService, private eventos:EventosService) { 
    this.room = new Room();
    this.roomuser = new RoomUser();
    this.myForm = fb.group({
      'name': ['', Validators.required],
      'materia': ['', Validators.required],
    });

    this.name = this.myForm.controls['name'];
    this.materia = this.myForm.controls['materia'];
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any){
    this.name = this.myForm.controls['name'];
    this.materia = this.myForm.controls['materia'];

    this.room.idroom = this.GenerarCodigo();
    this.room.name = this.name.value.toString();
    
    switch(parseInt(this.materia.value)){
      case 1:
        this.room.urlbanner = "../../assets/img/calculador.png";
      break;
      case 2:
        this.room.urlbanner = "../../assets/img/ciencias.png";
      break;
      case 3:
        this.room.urlbanner = "../../assets/img/ingles.png";
      break;
      case 4:
        this.room.urlbanner = "../../assets/img/programacion.png";
      break;
      case 5:
        this.room.urlbanner = "../../assets/img/retroalimentacion.png";
      break;
    }

    const session = localStorage.getItem("session");
    if(session === null){
      this.router.navigate(["login"]);
    }else{
      this.datos = JSON.parse(session);
    }

    this.room.idusuario = this.datos.iduser;
    this.GuardarRoom();

    

  }
  

  GenerarCodigo(): string{
    const abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const digit = ["0","1","2","3","4","5","6","7","8","9"];
    let codigo = "";

    for(let i=0; i<5; i++){
      const num = Math.floor(Math.random() * 12);
      if(num <= 5){
        codigo += abc[Math.floor(Math.random() * abc.length)];
      }else{
        codigo += digit[Math.floor(Math.random() * digit.length)];
      }
    }

    return codigo;
  }

  GuardarRoom(): void {
    this.RoomService.GuardarRoom(this.room).subscribe(data => {
      this.resultado = data;
      if(this.resultado.status){
        this.toastr.success(this.resultado.message);
        this.roomuser.idroom = this.room.idroom;
        this.roomuser.iduser = this.room.idusuario;
        this.GuardarRoomUser();
      }else{
        this.toastr.error(this.resultado.meesage);
      }
    })
  }

  GuardarRoomUser(): void{
    this.RoomUserService.GuardarRoomUser(this.roomuser).subscribe(data => {
      this.resultado = data;
      if(this.resultado.status){
        this.toastr.success(this.resultado.message);
        this.LimpiarInputs();
        this.eventos.evento.emit({
          data:true
        })
      }else{
        this.toastr.error(this.resultado.meesage);
      }
    })
  }

  LimpiarInputs(): void{
    this.myForm.patchValue({
      'name': '',
      'materia': ''
    });
  }

}
