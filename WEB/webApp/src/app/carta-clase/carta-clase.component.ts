import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-carta-clase',
  templateUrl: './carta-clase.component.html',
  styleUrls: ['./carta-clase.component.css']
})
export class CartaClaseComponent implements OnInit {

  @Input() sala: any;
  nombre: string;
  resultados: any;

  constructor(private UsuariosService: UsuariosService, private toastr: ToastrService) { this.nombre = ""; }

  ngOnInit(): void {
    this.ConsultarUsuario();
  }

  ConsultarUsuario(): void{
    this.UsuariosService.ConsultarUsuario(this.sala.idusuario).subscribe(data => {
      this.resultados = data;
      if(data.status){
        this.nombre = data.data[0].name + " " + data.data[0].Apellido1 + " " + data.data[0].Apellido2;
      }else{
        this.toastr.error(this.resultados.message);
      }
    })
  }

  goToRoom = (room: string) => {
    window.open("room/" + room, "_blank");
    // this.router.navigate(['/', room]);
  }

}
