import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() {}

  public initSocket(){
    this.socket = io(this.url);
  }

  public onEvent(event: string): Observable<any> {
    return new Observable<string>(observer => {
        this.socket.on(event, (data: any) => observer.next(data));
    });
  }
}
