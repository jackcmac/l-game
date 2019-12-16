import { Component } from '@angular/core';

class GameCell {
  row: number;
  col: number;
  state: number;
  oldState: number;
  unconfirmed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l-game';

  gameBoard = [];
  playerTurn = 2; // 1 = Blue // 2 = Red
  playerHasMovedL = false;
  canDrag = false;
  currentPlacingL: GameCell[] = [];
  hasSelectedNeutral = false;
  lastDragOver: GameCell;

  constructor() {
    let gameRow: GameCell[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        gameRow.push({
          row: i,
          col: j,
          state: 0, // 0 = Empty // 1 = Blue // 2 = Red // 3 = Neutral // 4 = Neutral Selected
          oldState: 0,
          unconfirmed: false
        });
      }
      this.gameBoard.push(gameRow);
      gameRow = [];
    }

    this.setupBoard();

    // Hand off to controller to start the game
    this.gameController();
  }

  public setupBoard() {

    // Set up neutral pieces
    this.gameBoard[0][3].state = 3;
    this.gameBoard[3][0].state = 3;

    // Set up blue L
    this.gameBoard[0][1].state = 1;
    this.gameBoard[0][2].state = 1;
    this.gameBoard[1][1].state = 1;
    this.gameBoard[2][1].state = 1;

    // Set up red L
    this.gameBoard[1][2].state = 2;
    this.gameBoard[2][2].state = 2;
    this.gameBoard[3][2].state = 2;
    this.gameBoard[3][1].state = 2;
  }

  public gameController() {
    
    // PER TURN
    // Allow user to draw new L

      // Verify this is a valid L
        // Correct shape
        // Not in same position
        // Not colliding with other object
      // Confirm placement of L
    // Allow option to move neutral piece
      // Verify move is valid
        // Not colliding with other object
    // Check for game over
    // Change turn
    

  }

  public printGameBoard() {
    console.log(this.gameBoard);
  }

  public checkClickStart(cell: GameCell) {
    console.log(cell);
    console.log(this.isValidLocation(cell), (cell.state == 0 || cell.state == this.playerTurn), !this.playerHasMovedL)
    if (this.isValidLocation(cell) && !this.canDrag) {
      if ((cell.state == 0 || cell.state == this.playerTurn) && !this.playerHasMovedL) {
        cell.oldState = cell.state;
        cell.state = this.playerTurn;
        cell.unconfirmed = true;
        this.currentPlacingL.push(cell);
        this.canDrag = true;
        this.lastDragOver = cell;
      } else if (cell.state == 3 && this.playerHasMovedL) {
        // Handle neutral move
        this.hasSelectedNeutral = true;
        cell.state = 4;
      } else if (cell.state == 0 && this.playerHasMovedL && this.hasSelectedNeutral) {
        this.gameBoard.forEach(row => {
          row.forEach(element => {
            if (element.state == 4) {
              element.state = 0;
            }
          });
        })
        cell.state = 3;
        this.hasSelectedNeutral = false;
        this.playerHasMovedL = false;
        this.playerTurn = this.playerTurn == 1 ? 2 : 1;
      }
    }
    
  }

  public skipNeutralMove() {
    if (this.playerHasMovedL) {
      this.hasSelectedNeutral = false;
      this.playerHasMovedL = false;
      this.playerTurn = this.playerTurn == 1 ? 2 : 1;
    }
  }

  public checkForDrag(cell: GameCell) {
    if (this.canDrag) {
      if (this.isValidLocation(cell) && (cell.state == 0 || cell.state == this.playerTurn) && !this.playerHasMovedL && this.isAdjacent(this.lastDragOver, cell)) {
        cell.oldState = cell.state;
        cell.state = this.playerTurn;
        cell.unconfirmed = true;
        this.currentPlacingL.push(cell);
        this.lastDragOver = cell;
        console.log(this.lastDragOver);
      }
    }
    
  }

  public checkPlaceComplete(cell: GameCell) {
    console.log(cell);
    this.canDrag = false;

    // Check if it is a valid L
    if (this.currentPlacingL.length !== 4) {
      this.clearInvalidL();
    } else {
      // Identify L direction
      if (this.currentPlacingL[1].row == this.currentPlacingL[2].row)  { // Long edge is horizontal
        if (this.currentPlacingL[0].row == this.currentPlacingL[1].row) { // Long edge is first 3
          if ((this.currentPlacingL[3].col == this.currentPlacingL[2].col) && ((this.currentPlacingL[3].row == this.currentPlacingL[2].row - 1) || this.currentPlacingL[3].row == this.currentPlacingL[2].row + 1)) {
            this.setNewL();
          }
        } else if (this.currentPlacingL[3].row == this.currentPlacingL[2].row) { // Long edge is last 3
          if ((this.currentPlacingL[0].col == this.currentPlacingL[1].col) && ((this.currentPlacingL[0].row == this.currentPlacingL[1].row - 1) || this.currentPlacingL[0].row == this.currentPlacingL[1].row + 1)) {
            this.setNewL();
          }
        } else {
          this.clearInvalidL();
        }
      } else if (this.currentPlacingL[1].col == this.currentPlacingL[2].col) { // Long edge is vertical
        if (this.currentPlacingL[0].col == this.currentPlacingL[1].col) { // Long edge is first 3
          if ((this.currentPlacingL[3].row == this.currentPlacingL[2].row) && ((this.currentPlacingL[3].col == this.currentPlacingL[2].col - 1) || this.currentPlacingL[3].col == this.currentPlacingL[2].col + 1)) {
            this.setNewL();
          }
        } else if (this.currentPlacingL[3].col == this.currentPlacingL[2].col) { // Long edge is last 3
          if ((this.currentPlacingL[0].row == this.currentPlacingL[1].row) && ((this.currentPlacingL[0].col == this.currentPlacingL[1].col - 1) || this.currentPlacingL[0].col == this.currentPlacingL[1].col + 1)) {
            this.setNewL();
          }
        } else {
          this.clearInvalidL();
        }
      } else {
        this.clearInvalidL();
      }
    }

    // Clear L
    this.currentPlacingL = [];
  }

  private setNewL() {
    this.gameBoard.forEach(row => {
      row.forEach(element => {
        if (element.state == this.playerTurn && !element.unconfirmed) {
          element.state = 0;
        }
      });
    });

    this.currentPlacingL.forEach(element => {
      element.unconfirmed = false;
    });

    this.playerHasMovedL = true;
  }

  private clearInvalidL() {
    this.currentPlacingL.forEach(element => {
      element.state = element.oldState;
      element.unconfirmed = false;
    });
  }

  private isValidLocation(cell: GameCell) {
    if (cell.row >= 0 && cell.row < 4 && cell.col >= 0 && cell.col < 4) {
      return true;
    }
    return false;
  }

  private isAdjacent(source: GameCell, target: GameCell) {
    if (Math.abs(source.row - target.row) == 1 && source.col == target.col) {
      return true;
    }
    if (Math.abs(source.col - target.col) == 1 && source.row == target.row) {
      return true;
    }
    return false;
  }
}
