import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';


@Injectable({
  providedIn: 'root',
})
export default class SenfInviteService {
  constructor(private router: Router){

  }
  public data!: UserModel[];

  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/invitehub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (personalCode: string) => {
    this.hubConnection.on(personalCode, (data) => {
      this.data = data;
      console.log(data +' received');
      if(data == "accept"){
        this.router.navigate(['chat/' + personalCode]);
      }
    });
  };
}
