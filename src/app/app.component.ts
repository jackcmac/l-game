import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l-game';

  gameBoard = [];

  constructor() {
    let startingGameCellState = {
      row: 0,
      col: 0,
      state: 0 // 0 = Empty // 1 = Blue // 2 = Red // 3 = Neutral
    }
    let gameRow = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        gameRow.push({
          row: 0,
          col: 0,
          state: 0 // 0 = Empty // 1 = Blue // 2 = Red // 3 = Neutral
        });
      }
      this.gameBoard.push(gameRow);
      gameRow = [];
    }

    this.setupBoard();
  }

  public setupBoard() {
    // Set up neutral pieces
    this.gameBoard[0][3].state = 3;
    this.gameBoard[3][0].state = 3;

    // Set up blue L
    this.gameBoard[0][1].state = 2;
    this.gameBoard[0][2].state = 2;
    this.gameBoard[1][1].state = 2;
    this.gameBoard[2][1].state = 2;

    // Set up red L
    this.gameBoard[1][2].state = 1;
    this.gameBoard[2][2].state = 1;
    this.gameBoard[3][2].state = 1;
    this.gameBoard[3][1].state = 1;
  }

  public indexTracker(index: number, item: any): number { return index; }

  public printGameBoard() {
    console.log(this.gameBoard);
  }
}
