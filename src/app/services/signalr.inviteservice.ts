import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';

import { Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export default class InviteService {
  public data!: UserModel;
  public inviteReceived = false;
  public accepted = false;
  private hubConnection!: signalR.HubConnection;

  constructor(private http: HttpClient){}

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
      .then(() => console.log('invite started!'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (username: string) => {
    this.hubConnection.on(username, (data) => {
      this.accepted = false
      this.data = data;
      this.inviteReceived = true;
      setTimeout(() => {
        if (!this.accepted) {
          this.inviteReceived = false;
          let json = JSON.stringify('dismiss');
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
          this.http
            .post(`${environment.apiURL}/api/invite/react/` + this.data, json, {
              headers: headers,
            })
            .subscribe((data) => {
              console.log(data);
            });
        }
      }, 30000);
    });
  };
}
