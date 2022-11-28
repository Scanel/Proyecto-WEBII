import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ResultadoUser, User } from '../modelos/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlBase: string = "https://api-videochat402.herokuapp.com/";

  constructor(private http: HttpClient) { }

  Login(usuario: User): Observable<ResultadoUser>{
    return this.http.post<ResultadoUser>(this.urlBase + "login", usuario);
  }

  ConsultarUsuarios(): Observable<ResultadoUser>
  {
    return this.http.get<ResultadoUser>(this.urlBase + "user");
  }

  ConsultarUsuario(id: number): Observable<ResultadoUser>
  {
    return this.http.get<ResultadoUser>(this.urlBase + "user/" + id);
  }

  GuardarUsuario(usuario: User): Observable<ResultadoUser>
  {
    return this.http.post<ResultadoUser>(this.urlBase + "user", usuario);
  }

  ActualizarUsuario(id:number, usuario: User): Observable<ResultadoUser>
  {
    return this.http.put<ResultadoUser>(this.urlBase + "user/" + id, usuario);
  }

  EliminarUsuario(id: number): Observable<ResultadoUser>
  {
    return this.http.delete<ResultadoUser>(this.urlBase + "user/" + id);
  }
}
