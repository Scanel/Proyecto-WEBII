import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../servicios/room.service';
import { RoomuserService } from '../servicios/roomuser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datos: any;
  vistas: boolean[];
  salas: Array<any> = [];

  resultados: any;

  constructor(private router: Router, private RoomuserService: RoomuserService, private RoomService: RoomService) {
    this.vistas = [true,false,false,false,false];
  }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session === null){
      this.router.navigate(["login"]);
    }else{
      this.datos = JSON.parse(session);
      console.log(this.datos);
      this.ConsultarRoomUser();
    }
    
  }

  goToRoom = () => {
    const room = "asd"

    window.open("room/asd", "_blank")
    // this.router.navigate(['/', room]);
  }

  LogOut(){
    localStorage.removeItem("session");
    this.router.navigate(["login"]);
  }

  ActivarVista(vista : number): void {
    this.DesactivarVistas();
    this.vistas[vista] = true;
  }

  DesactivarVistas(): void{
    this.vistas[0] = false;
    this.vistas[1] = false;
    this.vistas[2] = false;
    this.vistas[3] = false;
    this.vistas[4] = false;
  }

  ConsultarRoomUser(): void{
    this.RoomuserService.ConsultarRoomUser(this.datos.iduser).subscribe(data => {
      this.resultados = data.data;
      for(let i=0; i<this.resultados.length; i++){
        this.ConsultarRoom(this.resultados[i].idroom);
      }
    })
  }

  ConsultarRoom(room: string): void{
    this.RoomService.ConsultarRoom(room).subscribe(data => {
      let resultados = data;
      this.salas.push(resultados.data[0]);
    })
  }
}
