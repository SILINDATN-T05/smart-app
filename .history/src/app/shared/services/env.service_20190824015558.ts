import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:3090';
  // API_URL = 'http://102.133.129.78:3090';
  body = {
    channel: 'WEB-APP',
    application: 'MOVE-PORTAL'
  };

  constructor() {}
}
