import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChartModel } from 'src/_interfaces/chart.model';


@Injectable({
  providedIn: 'root',
})
export default class MessageService {

  private hubConnection!: signalR.HubConnection;
  
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/messagehub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (code: string) => {
    this.hubConnection.on(code, (data) => {
      
      console.log(data);
    });
  };
}
