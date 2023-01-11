import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoRoomUser, RoomUser } from '../modelos/roomuser.model';

@Injectable({
  providedIn: 'root'
})
export class RoomuserService {

  urlBase: string = "https://backendweb-production.up.railway.app/";

  constructor(private http: HttpClient) { }

  ConsultarRoomUser(id: string): Observable<ResultadoRoomUser>
  {
    return this.http.get<ResultadoRoomUser>(this.urlBase + "roomuser/" + id);
  }

  GuardarRoomUser(roomuser: RoomUser): Observable<ResultadoRoomUser>
  {
    return this.http.post<ResultadoRoomUser>(this.urlBase + "roomuser", roomuser);
  }
}
