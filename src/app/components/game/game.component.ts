import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import GameLogic from 'src/app/services/gameLogic';
import GameMove from 'src/models/gamemove';
import { UserModel } from 'src/_interfaces/usermodel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() roomCode!: string;

  public gameLogic!: GameLogic;
  user!: UserModel;
  constructor(public router: Router) {
    let tmpUser = sessionStorage.getItem('currentUser');
    if (tmpUser != null) {
      this.user = JSON.parse(tmpUser);
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.gameLogic = new GameLogic(this.roomCode, this.user.personalCode);
    this.gameLogic.start;
  }

  restart = () => {
    this.gameLogic.start;
  };

  buttonClick = (id: number) => {
    this.gameLogic.nextMove(new GameMove(id, this.gameLogic.role));
    
  };

  start = () => {
    this.gameLogic.start();
  };
}
