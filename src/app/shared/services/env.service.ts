import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = '';
  body = {
    channel: 'PORTAL',
    application: 'MOVE-PORTAL'
  }
  
  constructor() { }
}