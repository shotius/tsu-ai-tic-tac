import Board from './classes/board.js';
import Player from './classes/player.js';
import { drawWinningLine, hasClass, addClass } from './helpers.js';

// იწყებს ახალ თამაშს გარკვეული სიღრმით და startPlayer 1, თუ ადამიანი აპირებს დაწყებას
function newGame(depth = -1, startingPlayer = 1) {
	// ახალი მოთამაშის და ცარიელი დაფის ინსტალაცია
	const player = new Player(parseInt(depth));
	const board = new Board(['','','','','','','','','']);
	// ყველა # ბორდის კლასების გასუფთავება და უჯრედების HTML გასუფთავება
	const boardDIV = document.getElementById("board");
	boardDIV.className = '';
    boardDIV.innerHTML = 
        `<div class="cells-wrap">
            <div class="cell-0"></div>
            <div class="cell-1"></div>
            <div class="cell-2"></div>
            <div class="cell-3"></div>
            <div class="cell-4"></div>
            <div class="cell-5"></div>
            <div class="cell-6"></div>
            <div class="cell-7"></div>
            <div class="cell-8"></div>
        </div>`;
	// მასივში HTML უჯრედების შენახვა
	const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];
	// შიდა გამოყენების ზოგიერთი ცვლადის ინიციალიზაცია
	const starting = parseInt(startingPlayer),
		maximizing = starting;
    let playerTurn = starting;
    // თუ კომპიუტერი დაიწყებს მუშაობას, აირჩიეთ შემთხვევითი უჯრედი, სანამ ეს არის ცენტრი ან კუთხე
    if(!starting) {
        const centerAndCorners = [0,2,4,6,8];
        const firstChoice = centerAndCorners[Math.floor(Math.random()*centerAndCorners.length)];
        const symbol = !maximizing ? 'x' : 'o';
        board.insert(symbol, firstChoice);
        addClass(htmlCells[firstChoice], symbol);
        playerTurn = 1; // სვლის შეცვლა
    }
    // click მსმენელის დამატება თითოეული უჯრისთვის
    board.state.forEach((cell, index) => {
        htmlCells[index].addEventListener('click', () => {
            // თუ უჯრედი უკვე ოკუპირებულია ან დაფა ტერმინალურ მდგომარეობაშია, ან ადამიანი როდი დგება, ცრუ დაბრუნდით
            if(hasClass(htmlCells[index], 'x') || hasClass(htmlCells[index], 'o') || board.isTerminal() || !playerTurn) return false;
            const symbol = maximizing ? 'x' : 'o'; //Maximizing player is always 'x'
            // განაახლეთ Board კლასის მდგომარეობა, ასევე Board UI
            board.insert(symbol, index);
            addClass(htmlCells[index], symbol);
            // თუ ეს ტერმინალის ნაბიჯია და ეს არ არის ფრე, მაშინ ადამიანმა მოიგო
            if(board.isTerminal()) {
                drawWinningLine(board.isTerminal());
            }
            playerTurn = 0; // სვლის შეცვლა
            // მიიღეთ კომპიუტერის საუკეთესო ნაბიჯი და განაახლეთ UI
            player.getBestMove(board, !maximizing, best => {
                const symbol = !maximizing ? 'x' : 'o';
                board.insert(symbol, parseInt(best));
                addClass(htmlCells[best], symbol);
                if(board.isTerminal()) {
                    drawWinningLine(board.isTerminal());
                }
                playerTurn = 1; // სვლის შეცვლა
            });
        }, false);
        if(cell) addClass(htmlCells[index], cell);
    });
}

document.addEventListener("DOMContentLoaded", () => { 
	// დაიწყეთ ახალი თამაში, როდესაც გვერდი იტვირთება ნაგულისხმევი მნიშვნელობებით
	const depth = -1;
	const startingPlayer = 1;
    newGame(depth, startingPlayer);
    // დაიწყეთ ახალი თამაში არჩეული ვარიანტებით, როდესაც დააწკაპუნეთ ახალი თამაშის ღილაკზე
	document.getElementById("newGame").addEventListener('click', () => {
        document.getElementById('layout').style.display = 'none'
		const startingDIV = document.getElementById("starting");
		const starting = startingDIV.options[startingDIV.selectedIndex].value;
		const depthDIV = document.getElementById("depth");
        const depth = depthDIV.options[depthDIV.selectedIndex].value;
		newGame(depth, starting);
	});
});