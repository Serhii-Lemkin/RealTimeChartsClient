import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChartModel } from 'src/_interfaces/chart.model';
import { MessageModel } from 'src/_interfaces/message.model';
import { MessageInt } from 'src/_interfaces/messageInt';

@Injectable({
  providedIn: 'root',
})
export default class MessageService {
  messages: MessageModel[] = [];
  newMessage!: MessageModel;
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/messagehub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection To Message started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  public stopConnection=()=>{
    this.hubConnection.stop();
    this.messages = [];
  }

  public addTransferDataListener = (code: string) => {
    console.log(code);
    this.hubConnection.on(code, (data) => {
      
    });
  };
}
