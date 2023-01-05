import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomUser } from '../modelos/roomuser.model';
import { EventosService } from '../servicios/eventos.service';
import { RoomuserService } from '../servicios/roomuser.service';

@Component({
  selector: 'app-unirse-room',
  templateUrl: './unirse-room.component.html',
  styleUrls: ['./unirse-room.component.css']
})
export class UnirseRoomComponent implements OnInit {

  myForm: any;
  codigo: AbstractControl;

  roomuser: RoomUser;
  datos: any;
  iduser: number;
  resultados: any;
  
  constructor(fb: FormBuilder, private RoomuserService: RoomuserService, private router: Router, private toastr: ToastrService, private eventos: EventosService) {
    this.roomuser = new RoomUser();
    this.iduser = 0;
    this.myForm = fb.group({
      'codigo': ['', Validators.required]
    });
    this.codigo = this.myForm.controls['codigo'];
  }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session === null){
      this.router.navigate(["login"]);
    }else{
      this.datos = JSON.parse(session);
      this.iduser = this.datos.iduser;
    }
  }

  onSubmit(form: any): void{
    this.codigo = this.myForm.controls['codigo'];
    this.roomuser.idroom = this.codigo.value.toString();
    this.roomuser.iduser = this.iduser;
    this.GuardarRoomUser();
  }

  GuardarRoomUser(): void{
    this.RoomuserService.GuardarRoomUser(this.roomuser).subscribe(data => {
      this.resultados = data;
      if(this.resultados.status){
        this.toastr.success(this.resultados.message);
        this.LimpiarInputs();
        this.eventos.evento.emit({
          data:true
        });
      }else{
        this.toastr.error(this.resultados.message);
      }
    })
  }

  LimpiarInputs(): void{
    this.myForm.patchValue({
      'codigo': ''
    });
  }

}
