import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../modelos/user.model';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  myForm: any;
  email:AbstractControl;
  nombre:AbstractControl;
  apellido1:AbstractControl;
  apellido2:AbstractControl;
  datos: any;
  resultados:any;
  s_Email: string;
  s_Nombre: string;
  s_Apellido1: string;
  s_Apellido2: string;
  usuario: User;

  constructor(fb:FormBuilder, private toastr: ToastrService, private UsuariosService: UsuariosService, private router: Router) { 
    this.usuario = new User();
    this.myForm = fb.group({
      'email': ['', Validators.required],
      'nombre': ['', Validators.required],
      'apellido1': ['', Validators.required],
      'apellido2': ['']
    });
    this.s_Email = "";
    this.s_Nombre = "";
    this.s_Apellido1 = "";
    this.s_Apellido2 = "";
    this.email = this.myForm.controls['email'];
    this.nombre = this.myForm.controls['nombre'];
    this.apellido1 = this.myForm.controls['apellido1'];
    this.apellido2 = this.myForm.controls['apellido2'];
  }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session === null){
      this.router.navigate(["login"]);
    }else{
      this.datos = JSON.parse(session);
      this.ConsultarUsuario();
    }
  }

  onSubmit(form:any){
    this.email = this.myForm.controls['email'];
    this.nombre = this.myForm.controls['nombre'];
    this.apellido1 = this.myForm.controls['apellido1'];
    this.apellido2 = this.myForm.controls['apellido2'];

    this.usuario.Email = this.email.value.toString();
    this.usuario.name = this.nombre.value.toString();
    this.usuario.Apellido1 = this.apellido1.value.toString();
    this.usuario.Apellido2 = this.apellido2.value.toString();

    this.ActualizarUsuario();

  }

  ConsultarUsuario(){
    this.UsuariosService.ConsultarUsuario(this.datos.iduser).subscribe(data => {
      this.resultados = data;
      console.log(this.resultados.data[0]);
      if(this.resultados.status){
        this.s_Email = this.resultados.data[0].Email;
        this.s_Nombre = this.resultados.data[0].name;
        this.s_Apellido1 = this.resultados.data[0].Apellido1;
        this.s_Apellido2 = this.resultados.data[0].Apellido2;
        //this.toastr.success(this.resultados.message);
      }else{
        this.toastr.error(this.resultados.message);
      }
    })
  }

  ActualizarUsuario(){
    this.UsuariosService.ActualizarUsuario(this.datos.iduser, this.usuario).subscribe(data => {
      this.resultados = data;
      if(this.resultados.status){
        this.toastr.success(this.resultados.message);
      }else{
        this.toastr.error(this.resultados.message);
      }
    })
  }
}
