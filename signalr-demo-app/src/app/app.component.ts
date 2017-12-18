import { Component, OnInit, EventEmitter } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  changePosition = new EventEmitter<any>();

  private moved: boolean;
  private newPosition: any;
  private connection: HubConnection;
  private interval = 50;
  ngOnInit(): void {
    console.log('ngOnit');

    this.connection = new HubConnection('http://localhost:5000/move');

    this.connection.on('move', data => {
      if (this.changePosition) {
        this.changePosition.emit({ x: data.x, y: data.y });
      }
    });

    this.connection.start()
      .then(() => console.log('websocket connected!'));

    setInterval(() => {
      if (this.moved) {
        this.connection.invoke('move', this.newPosition);
        this.moved = false;
      }
    }, this.interval);
  }

  postionChanged(event: any) {
    this.newPosition = { x: event.x, y: event.y };
    this.moved = true;
  }
}
