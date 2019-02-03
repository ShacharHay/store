import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/index';

@Injectable()
export class MessagesServices {

  constructor(private socket: Socket) {

  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public messagesReceiver(): Observable<string> {
    return this.socket.fromEvent('message');
  }
}
