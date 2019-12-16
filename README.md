# LGame

L-game is a two person simple yet challenging strategy game. The game was created by Edward de Bono in 1967. This code is a simple implementation of this game that will be used in the future to test neural network performance in learning the optimal play of this game. To learn more about L-game, see: https://en.wikipedia.org/wiki/L_game

# Play

L-game is turn based. On each turn, the player must move their "L" piece to a new location. This location must not be the exact same as its previous location and cannot collide with other pieces on the board. The player may then optionally move a neutral piece or end their turn. The goal is to make the other player unable to move their "L" to a new location. Example win conditions can be found in the article above.

For this implementation, the new "L" position is created by clicking and dragging on free board space. The neutral pieces are moved by clicking on a black neutral piece and then clicking on its new destination.

# Neural Network

The goal with this game is to create a neural network that can learn the optimal play strategy to fulfill the non-deterministic quality of the game through perfect play.
