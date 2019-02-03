import {Component} from '@angular/core';
import {MessagesServices} from "./services/MessagesServices";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public notification: string;

  constructor(private messagesService: MessagesServices) {
    this.messagesService.messagesReceiver().subscribe(msg => {
      this.notification = msg;
      setTimeout(() => {
        this.notification = null
      }, 5000);
    });
  }

  title = 'app';
}
