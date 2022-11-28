import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../modelos/user.model';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: any;
  resultado: any;
  usuario: User;

  email: AbstractControl;
  password: AbstractControl;

  constructor(fb: FormBuilder,private UsuariosService: UsuariosService, private toastr: ToastrService,private router: Router) { 
    this.usuario = new User();
    this.myForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session !== null){
      this.router.navigate(["/"]);
    }
  }

  onSubmit(form: any): void{
    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];

    this.usuario.Email = this.email.value.toString();
    this.usuario.Password = this.password.value.toString();

    this.Login();
  }

  Login(){
    this.UsuariosService.Login(this.usuario).subscribe(data => {
      this.resultado = data;
      if(this.resultado.status){
        this.toastr.success(this.resultado.message);

        this.usuario.iduser = this.resultado.data[0].iduser;
        this.usuario.Email = this.resultado.data[0].Email;
        this.usuario.Apellido1 = this.resultado.data[0].apellido1;
        this.usuario.Apellido2 = this.resultado.data[0].apellido2;
        this.usuario.name = this.resultado.data[0].name;
        this.usuario.idRol = this.resultado.data[0].idRol;

        localStorage.setItem("session", JSON.stringify(this.usuario));
        this.router.navigate(["/"]);
      }else{
        this.toastr.error(this.resultado.message);
      }
    })
  }

}
