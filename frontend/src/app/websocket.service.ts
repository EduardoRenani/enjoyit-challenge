import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private socket;

  constructor() {}

  public initSocket() {
    this.socket = io(environment.backendUrl);
  }

  public onEvent(event: string): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on(event, (data: any) => observer.next(data));
    });
  }
}
