import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import GameMove from 'src/models/gamemove';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';
import GameLogic from './gameLogic';

@Injectable({
  providedIn: 'root',
})
export default class GameService {
  constructor() {
   // 
  }
  public data!: UserModel[];
  public gamelogic!: GameLogic;

  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/ticktacktoehub`)
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (
    code: string,
    currentUserCode: string
  ) => {
    this.gamelogic = new GameLogic(code, currentUserCode);
    this.hubConnection.on(code, (data) => {
      console.log(data);
      if (data === 'restart') {
        console.log('restart');
        this.gamelogic.start();
      }
      console.log('data is move');
      this.gamelogic.nextMove(data as GameMove);
    });
  };
}
