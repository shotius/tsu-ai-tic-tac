import Board from "./classes/board.js";
import Player from "./classes/player.js";

const board = new Board(["x", "o", "", "x", "o", "", "o", "", "x"]);
board.printFormattedBoard();
console.log(board.isTerminal());
board.insert("o", 7);
board.printFormattedBoard();
console.log(board.getAvailableMoves());
console.log(board.isTerminal());

const player = new Player()
console.log(player)