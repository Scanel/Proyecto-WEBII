import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avatar, ResultadoAvatar } from '../modelos/avatar.model';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  urlBase: string = "https://backendweb-production.up.railway.app/";

  constructor(private http: HttpClient) { }

  ConsultarAvatar(id: number): Observable<ResultadoAvatar>
  {
    return this.http.get<ResultadoAvatar>(this.urlBase + "avatar/" + id);
  }

  GuardarAvatar(avatar: Avatar): Observable<ResultadoAvatar>
  {
    return this.http.post<ResultadoAvatar>(this.urlBase + "avatar", avatar);
  }

  ActualizarAvatar(id:number, avatar: Avatar): Observable<ResultadoAvatar>
  {
    return this.http.put<ResultadoAvatar>(this.urlBase + "avatar/" + id, avatar);
  }
}
