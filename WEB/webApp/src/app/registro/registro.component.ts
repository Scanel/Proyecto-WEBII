import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';
import { User } from '../modelos/user.model';
import { ToastrService } from 'ngx-toastr';
import { AvatarService } from '../servicios/avatar.service';
import { Avatar } from '../modelos/avatar.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  myForm: any;
  email: AbstractControl;
  password1: AbstractControl;
  password2: AbstractControl;
  nombre: AbstractControl;
  apellido1: AbstractControl;
  apellido2: AbstractControl;
  tipo: AbstractControl;

  usuario: User;
  avatar: Avatar;
  resultado: any;

  constructor(fb: FormBuilder, private UsuariosService: UsuariosService, private toastr: ToastrService, private router: Router, private AvatarService: AvatarService) {
    this.usuario = new User();
    this.avatar = new Avatar();
    this.myForm = fb.group({
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]],
      'password1': ['', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,16}$')]],
      'password2': ['', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,16}$')]],
      'nombre': ['', Validators.required],
      'apellido1': ['', Validators.required],
      'apellido2': [''],
      'tipo': ['', Validators.required]
    });
    this.email = this.myForm.controls['email'];
    this.password1 = this.myForm.controls['password1'];
    this.password2 = this.myForm.controls['password2'];
    this.nombre = this.myForm.controls['nombre'];
    this.apellido1 = this.myForm.controls['apellido1'];
    this.apellido2 = this.myForm.controls['apellido2'];
    this.tipo = this.myForm.controls['tipo'];
    
  }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session !== null){
      this.router.navigate(["/"]);
    }
  }

  onSubmit(form:any): void {

    this.email = this.myForm.controls['email'];
    this.password1 = this.myForm.controls['password1'];
    this.password2 = this.myForm.controls['password2'];
    this.nombre = this.myForm.controls['nombre'];
    this.apellido1 = this.myForm.controls['apellido1'];
    this.apellido2 = this.myForm.controls['apellido2'];
    this.tipo = this.myForm.controls['tipo'];

    this.usuario.Email =  this.email.value.toString();
    this.usuario.Password = this.password1.value.toString();
    this.usuario.name = this.nombre.value.toString();
    this.usuario.Apellido1 = this.apellido1.value.toString();
    this.usuario.Apellido2 = this.apellido2.value.toString();
    this.usuario.idRol = this.tipo.value;
    this.usuario.idavatar = 1;

    if(this.password1.value === this.password2.value){
      this.GuardarUsuario();
    }else{
      this.toastr.error("Las contraseñas no coinciden");
    }

  }

  GuardarUsuario(){
    this.UsuariosService.GuardarUsuario(this.usuario).subscribe(data => {
      this.resultado = data;
      if(this.resultado.status){
        this.toastr.success(this.resultado.message);
        this.avatar.iduser = this.resultado.data[0].iduser;
        this.avatar.urlSkin = "../../assets/Avatar/Masculino/body/BodyM01.png";
        this.avatar.urlEyes = "../../assets/Avatar/Masculino/eyes/1/EyesM01-brown.png";
        this.avatar.urlFeet = "...";
        this.avatar.urlHair = "../../assets/Avatar/Masculino/hair/1/HairM01-brown.png";
        this.avatar.urlLegs = "../../assets/Avatar/Masculino/pants/1/PantsM01-blue.png";
        this.avatar.urlBody = "../../assets/Avatar/Masculino/t-shirt/1/TShirtM01-brown.png";
        this.GuardarAvatar();
      }else{
        this.toastr.error(this.resultado.message);
      }
    })
  }

  GuardarAvatar(){
    this.AvatarService.GuardarAvatar(this.avatar).subscribe(data => {
      this.resultado = data;
      if(this.resultado.status){
        this.toastr.success(this.resultado.message);
        this.LimpiarInputs();
      }else{
        this.toastr.error(this.resultado.message);
      }
    })
  }

  LimpiarInputs(): void{
    this.myForm.patchValue({
      'email': '',
      'password1': '',
      'password2': '',
      'nombre': '',
      'apellido1': '',
      'apellido2': '',
      'tipo': ''
    });
  }
}
