import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.wsUrl);
  }

  getMetadata(): Observable<any> {
    return new Observable(observer => {
      this.socket.emit('getMetadata');
      
      this.socket.on('metadata', (data: unknown) => {
        observer.next(data);
      });

      // Cleanup
      return () => {
        this.socket.off('metadata');
      };
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}