import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';


@Injectable({
  providedIn: 'root',
})
export default class InviteService {
  public data!: UserModel;
  public inviteReceived = false;

  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/invitehub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started invite reciever'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (username: string) => {
    this.hubConnection.on(username, (data) => {
      this.data = data;
      console.log(data);
      console.log('hi from invite');
      this.inviteReceived = true;
    });
  };
}
