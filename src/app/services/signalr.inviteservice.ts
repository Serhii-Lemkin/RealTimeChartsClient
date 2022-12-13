import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';

import { Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export default class InviteService {
  public data!: UserModel;
  public inviteReceived = false;
  @Output() autodismiss = new EventEmitter<boolean>();
  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/invitehub`)
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public onAutodismiss = () => {
    this.autodismiss.emit(true);
  };

  public addTransferChartDataListener = (username: string) => {
    this.hubConnection.on(username, (data) => {
      this.data = data;
      this.inviteReceived = true;
    });
  };
}
