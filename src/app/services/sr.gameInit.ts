import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { MessageModel } from 'src/_interfaces/message.model';

@Injectable({
  providedIn: 'root',
})
export default class MessageService {
  messages: MessageModel[] = [];
  newMessage!: MessageModel;
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/messagehub`)
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
