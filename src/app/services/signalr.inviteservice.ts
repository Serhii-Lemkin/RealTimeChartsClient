import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
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
      .withUrl(`${environment.apiURL}/invitehub`)
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (username: string) => {
    this.hubConnection.on(username, (data) => {
      this.data = data;
      this.inviteReceived = true;
    });
  };
}
