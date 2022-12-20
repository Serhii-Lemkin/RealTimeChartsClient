import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';

@Injectable({
  providedIn: 'root',
})
export default class ActiveUsers {
  public data!: UserModel[];

  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/chart`)
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('active users started!'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.hubConnection.on('activeUsers', (data) => {
      this.data = data;
          
    });
  };
}
