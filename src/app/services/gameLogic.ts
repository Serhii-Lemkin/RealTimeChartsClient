import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Q } from 'chart.js/dist/chunks/helpers.core';
import GameMove from 'src/models/gamemove';

export default class GameLogic {
  buttonIDs = [11, 12, 13, 21, 22, 23, 31, 32, 33];
  history: GameMove[] = [];
  role: string;
  code: string;
  counter: number = 0;
  currentRole: string = 'X';
  gameEnded: boolean = false;
  winner: string = '';
  constructor(code: string, currentUserCode: string) {
    this.code = code;

    if (this.code === currentUserCode) {
      this.role = 'X';
    } else {
      this.role = 'O';
    }
    this.rebuildHistory();
  }
  start = () => {
    this.switchRoles();
    this.clearButtons();
    this.clearHistory();
    this.counter = 0;
    this.currentRole = 'X';
    this.gameEnded = false;
    this.winner = '';
  };

  nextMove = (m: GameMove) => {
    console.log(m.cellId);
    var btn = document.getElementById(`${m.cellId}`)!;
    console.log(m);
    if (btn.innerHTML != '') {
      return;
    }
    console.log('goodspot');
    btn.innerHTML = this.currentRole;
    console.log(this.currentRole);
    this.changeRole();
    this.counter++;
    this.history.push(m);
    sessionStorage.setItem('gameHistory', JSON.stringify(this.history));

    if (this.counter > 4) {
      this.checkWin();
    }
  };
  changeRole() {
    if (this.currentRole == 'X') {
      this.currentRole = 'O';
    } else {
      this.currentRole = 'X';
    }
  }
  switchRoles() {
    if (this.role == 'X') {
      this.role = 'O';
    } else {
      this.role = 'X';
    }
  }

  clearHistory = () => {
    if (sessionStorage.getItem('gameHistory')) {
      sessionStorage.removeItem('gameHistory');
    }
    this.history = [];
  };

  rebuildHistory() {
    let tmphistory = sessionStorage.getItem('gameHistory');
    if (tmphistory) this.history = JSON.parse(tmphistory);
    this.history.map((m) => this.nextMove(m));
  }
  clearButtons() {
    this.buttonIDs.map((id) => {
      let btn = document.getElementById(`${id}`)!;
      btn.innerHTML = '';
    });
  }
  checkWin() {
    let b11 = document.getElementById(`${11}`)!;
    let b12 = document.getElementById(`${12}`)!;
    let b13 = document.getElementById(`${13}`)!;
    let b21 = document.getElementById(`${21}`)!;
    let b22 = document.getElementById(`${22}`)!;
    let b23 = document.getElementById(`${23}`)!;
    let b31 = document.getElementById(`${31}`)!;
    let b32 = document.getElementById(`${32}`)!;
    let b33 = document.getElementById(`${33}`)!;

    if (
      (b11.innerHTML === b12.innerHTML &&
        b12.innerHTML === b13.innerHTML &&
        b13.innerHTML != '') ||
      (b21.innerHTML === b22.innerHTML &&
        b22.innerHTML === b23.innerHTML &&
        b23.innerHTML != '') ||
      (b31.innerHTML === b32.innerHTML &&
        b32.innerHTML === b33.innerHTML &&
        b33.innerHTML != '') ||
      (b11.innerHTML === b21.innerHTML &&
        b21.innerHTML === b31.innerHTML &&
        b31.innerHTML != '') ||
      (b12.innerHTML === b22.innerHTML &&
        b22.innerHTML === b32.innerHTML &&
        b32.innerHTML != '') ||
      (b13.innerHTML === b23.innerHTML &&
        b23.innerHTML === b33.innerHTML &&
        b33.innerHTML != '') ||
      (b11.innerHTML === b22.innerHTML &&
        b22.innerHTML === b33.innerHTML &&
        b33.innerHTML != '') ||
      (b13.innerHTML === b22.innerHTML &&
        b22.innerHTML === b31.innerHTML &&
        b31.innerHTML != '')
    ) {
      this.changeRole();
      this.winner = this.currentRole;
      this.gameEnded = true;
      this.switchRoles();
    }
    if (this.counter === 9) this.gameEnded = true;
    if (this.gameEnded) {
      return;
    }
  }
}
