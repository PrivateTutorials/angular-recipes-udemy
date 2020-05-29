import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  lastLogged: string;

  printLog(message: string){
    console.log('Last logged message: ' + this.lastLogged);
    console.log('Current message: ' + message);
    this.lastLogged = message;
  }
}
