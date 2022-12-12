import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ChartModel } from 'src/_interfaces/chart.model';
import { MessageModel } from 'src/_interfaces/message.model';
import { MessageInt } from 'src/_interfaces/messageInt';

@Injectable({
  providedIn: 'root',
})
export default class MessageService {
  messages: MessageModel[] = [];
  newMessage!: MessageModel;
  showGame! : boolean;
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.showGame = false
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/messagehub`)
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  public stopConnection=()=>{
    this.hubConnection.stop();
    this.messages = [];
  }

  public addTransferDataListener = (code: string, currentUser:string) => {
    this.hubConnection.on(code, (data) => {
      if(data as string === "start"){
          this.showGame = true
          return
      }
      this.newMessage = data as MessageModel;
      this.messages.unshift(this.newMessage)
      sessionStorage.setItem(code, JSON.stringify(this.messages))
    });
  };
}
