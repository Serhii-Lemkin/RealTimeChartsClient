import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';

@Injectable({
  providedIn: 'root',
})
export default class SenfInviteService {
  constructor(private router: Router) {}
  public data!: UserModel[];

  inviteSent: boolean = false;

  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/invitehub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('sendinvite started!'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (personalCode: string) => {
    this.hubConnection.on(personalCode, (data) => {
      this.data = data;
      if (data == 'accept') {
        this.inviteSent = false;
        this.hubConnection.stop;
        this.router.navigate(['chat/' + personalCode]);
      }
      if (data == 'dismiss') {
        this.inviteSent = false;
        this.hubConnection.stop;
      }
    });
  };
}
