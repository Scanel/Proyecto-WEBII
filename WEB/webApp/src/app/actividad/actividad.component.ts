import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  myForm: any;

  titulo: AbstractControl;
  descripcion: AbstractControl;
  r1: AbstractControl;
  r2: AbstractControl;
  r3: AbstractControl;
  r4: AbstractControl;

  constructor(fb: FormBuilder, private toastr: ToastrService, private webSocketService: WebSocketService) { 
    this.myForm = fb.group({
      'titulo': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'r1': ['', Validators.required],
      'r2': ['', Validators.required],
      'r3': ['', Validators.required],
      'r4': ['', Validators.required]
    });
    this.titulo = this.myForm.controls['titulo'];
    this.descripcion = this.myForm.controls['descripcion'];
    this.r1 = this.myForm.controls['r1'];
    this.r2 = this.myForm.controls['r2'];
    this.r3 = this.myForm.controls['r3'];
    this.r4 = this.myForm.controls['r4'];
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) : void{
    this.titulo = this.myForm.controls['titulo'];
    this.descripcion = this.myForm.controls['descripcion'];
    this.r1 = this.myForm.controls['r1'];
    this.r2 = this.myForm.controls['r2'];
    this.r3 = this.myForm.controls['r3'];
    this.r4 = this.myForm.controls['r4'];

    const body = {
      titulo: this.titulo.value.toString(),
      descripcion: this.descripcion.value.toString(),
      r1: this.r1.value.toString(),
      r2: this.r2.value.toString(),
      r3: this.r3.value.toString(),
      r4: this.r4.value.toString()
    }

    this.webSocketService.SendTarea(body);

    this.LimpiarInputs();

    this.toastr.success("Creaste una nueva tarea");

  }

  LimpiarInputs(): void{
    this.myForm.patchValue({
      'titulo': '',
      'descripcion': '',
      'r1': '',
      'r2': '',
      'r3': '',
      'r4': ''
    });
  }
}
