import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoTask, Task } from '../modelos/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlBase: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  ConsultarTareas(): Observable<ResultadoTask>
  {
    return this.http.get<ResultadoTask>(this.urlBase + "task");
  }

  ConsultarTarea(id: string): Observable<ResultadoTask>
  {
    return this.http.get<ResultadoTask>(this.urlBase + "task/" + id);
  }

  GuardarTarea(tarea: Task): Observable<ResultadoTask>
  {
    return this.http.post<ResultadoTask>(this.urlBase + "task", tarea);
  }
}
