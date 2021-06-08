import Board from "./classes/board.js";
import Player from "./classes/player.js";

const board = new Board(["x", "", "", "", "", "", "", "", ""]);
board.printFormattedBoard();
const p = new Player(1);
console.log(p.getBestMove(board));
console.log(p.nodesMap);