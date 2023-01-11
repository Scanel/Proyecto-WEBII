import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoRoom, Room } from '../modelos/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  urlBase: string = "https://backendweb-production.up.railway.app/";

  constructor(private http: HttpClient) { }

  ConsultarRoom(id: string): Observable<ResultadoRoom>
  {
    return this.http.get<ResultadoRoom>(this.urlBase + "room/" + id);
  }

  GuardarRoom(room: Room): Observable<ResultadoRoom>
  {
    return this.http.post<ResultadoRoom>(this.urlBase + "room", room);
  }
}
