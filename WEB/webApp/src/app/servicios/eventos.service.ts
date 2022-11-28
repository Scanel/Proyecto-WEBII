import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  @Output() evento: EventEmitter<any> = new EventEmitter(); 
  constructor() { }
}
