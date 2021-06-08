import Board from './board.js';

export default class Player {
    constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }
    getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
        // გაასუფთავე nodesMap თუ ფუნქცია იძახება ახალი სვლისთვის
        if(depth == 0) this.nodesMap.clear();
        
        // თუ დაფის მდგომარებოა დამამთავრებელია, დააბრუნეთ ევრისტიკური მნიშვნელობა
        if(board.isTerminal() || depth === this.maxDepth ) {
            if(board.isTerminal().winner === 'x') {
                return 100 - depth;
            } else if (board.isTerminal().winner === 'o') {
                return -100 + depth;
            } 
            return 0;
        }
        if(maximizing) {
            // მინუს უსასრულობად აღებული მნიშვნელობა
            let best = -100;
            // ყველა ცარიელი უჯრისთვის შესრულედება
            board.getAvailableMoves().forEach(index => {
                // ახალი დაფის ინიციალიზაცია ჩვენი ამჟამინდელი მდგომარეობის ასლით
                const child = new Board([...board.state]);
                // შექმნათ ბავშვის კვანძი მიმდინარე მაქსიმალურ სიმბოლოში x მაქსიმალური სიმბოლოს ჩასმით
                child.insert('x', index);
                // ამჯერად getBestMove რეკორულად გამოიძახება ახალი დაფით და მინიმიზაციით და გაზრდით სიღრმით
                const nodeValue = this.getBestMove(child, false, callback, depth + 1);
                // საუკეთესო მნიშვნელობის განახლება
                best = Math.max(best, nodeValue);
                
                // თუ ეს არის მთავარი ფუნქციის გამოძახება და არაც რეკურსიული, ასახეთ თითოეული ევრისტიკური მნიშვნელობა მისი მოძრაობის ინდექსებით
                if(depth == 0) {
                    // მძიმით გამოყოფილი ინდექსები, თუ მრავალჯერადი სვლას აქვს იგივე ევრისტიკური მნიშვნელობა
                    const moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${index}` : index;
                    this.nodesMap.set(nodeValue, moves);
                }
            });
            //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
            // თუ ეს არის მთავარი გამოძახება, დააბრუნეთ საუკეთესო ნაბიჯის ან შემთხვევითი ინდექსის, თუ მრავალ ინდექსს აქვს იგივე მნიშვნელობა
            if(depth == 0) {
                let returnValue;
                if(typeof this.nodesMap.get(best) == 'string') {
                    const arr = this.nodesMap.get(best).split(',');
                    const rand = Math.floor(Math.random() * arr.length);
                    returnValue = arr[rand];
                } else {
                    returnValue = this.nodesMap.get(best);
                }
                //run a callback after calculation and return the index
                // გაანგარიშების შემდეგ გამოძახე callback და დააბრუნეთ ინდექსი
                callback(returnValue);
                return returnValue;
            }
            // თუ არა მთავარი გამოძახება (რეკურსიული) დავაბრუნოთ ევრისტიკური მნიშვნელობა შემდეგი გაანგარიშებისთვის
            return best;
        }

        if(!maximizing) {
			// ინიცირება საუკეთესო მაქსიმალურ მნიშვნელობამდე
			let best = 100;
			//Loop through all empty cells
			board.getAvailableMoves().forEach(index => {
				// ახალი დაფის ინიციალიზაცია ჩვენი ამჟამინდელი მდგომარეობის ასლით
                const child = new Board([...board.state]);

				// შექმენით child კვანძი მიმდინარე ცარიელ უჯრედში მინიმიზაციის სიმბოლოს ჩასმით
				child.insert('o', index);
			
				// ამჯერად getBestMove რეკორდულად გამოიძახება ახალი დაფით და მაქსიმიზაციით და გაზრდილი სიღმით
				let nodeValue = this.getBestMove(child, true, callback, depth + 1);
				// საუკეთესო მნიშვნელობის განახლება
				best = Math.min(best, nodeValue);
				
				// თუ ეს არის მთავარი ფუნქციის გამოძახება და არა რეკურსიული, ასახეთ თითოეული ევრისტიკური მნიშვნელობა მისი მოძრაობის ინდექსებით
				if(depth == 0) {
					// მძიმით გამოყოფილი ინდექსები, თუ მრავალჯერადი სვლას აქვს იგივე ევრისტიკური მნიშვნელობა
					const moves = this.nodesMap.has(nodeValue) ? this.nodesMap.get(nodeValue) + ',' + index : index;
					this.nodesMap.set(nodeValue, moves);
				}
			});
			// თუ ეს არის მთავარი გამოძახება, დააბრუნეთ საუკეთესო ნაბიჯის ან შემთხვევითი ინდექსის, თუ მრავალ ინდექსს აქვს იგივე მნიშვნელობა
			if(depth == 0) {
                let returnValue;
				if(typeof this.nodesMap.get(best) == 'string') {
					const arr = this.nodesMap.get(best).split(',');
					const rand = Math.floor(Math.random() * arr.length);
					returnValue = arr[rand];
				} else {
					returnValue = this.nodesMap.get(best);
				}
				// გაანგარიშების შემდეგ აწარმოეთ გამოძახება და დააბრუნეთ ინდექსი
				callback(returnValue);
				return returnValue;
			}
			// თუ არაა მთავარი გამოძახება (რეკურსიული) დავაბრუნოთ ევრისტიკური მნიშვნელობა შემდეგი გაანგარიშებისთვის
			return best;
		}
    }
}