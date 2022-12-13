import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import GameLogic from 'src/app/services/gameLogic';
import GameService from 'src/app/services/signalr.gameService';
import { environment } from 'src/environments/environment';
import GameMove from 'src/models/gamemove';
import { UserModel } from 'src/_interfaces/usermodel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() roomCode!: string;

  user!: UserModel;
  constructor(
    public router: Router,
    public gameService: GameService,
    public http: HttpClient
  ) {
    let tmpUser = sessionStorage.getItem('currentUser');
    if (tmpUser != null) {
      this.user = JSON.parse(tmpUser);
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.gameService.startConnection();
    this.gameService.addTransferChartDataListener(
      this.roomCode,
      this.user.personalCode
    );
    //this.gameService.gamelogic.start();
    this.gameService.gamelogic.rebuildHistory();
  }

  restart = () => {
    this.gameService.gamelogic.start();
  };

  buttonClick = (id: number) => {
    if (
      this.gameService.gamelogic.currentRole !== this.gameService.gamelogic.role
    ) {
      return;
    }
    this.http
      .post(
        `${environment.apiURL}/api/tictactoe`,
        new GameMove(id, this.gameService.gamelogic.role, this.roomCode)
      )
      .subscribe((data) => {});

    // this.gameService.gamelogic.nextMove(
    //   new GameMove(id, this.gameService.gamelogic.role, this.roomCode)
    // );
  };

  start = () => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(
        `${environment.apiURL}/api/tictactoe/restart/${this.roomCode}`,
        JSON.stringify('restart'),
        { headers: headers }
      )
      .subscribe((data) => {});
  };
}
