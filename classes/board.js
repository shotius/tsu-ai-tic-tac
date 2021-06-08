/**
  * @desc ეს კლასი წარმოადგენს დაფას, შეიცავს მეთოდებს, რომლებიც ამოწმებს დაფის მდგომარეობას, სიმბოლოს და ა.შ..
  * @param {Array} state - მასივი წარმოადგენს დაფის მდგომარეობას
*/
class Board {
    // დაფის ინიცირება
    constructor(state = ['','','','','','','','','']) {
        this.state = state;
    }

    // ამოწმებს,არის თუ არა ყველა უჯრა ცარიელი
    isEmpty() {
        return this.state.every(cell => !cell);
    }
    // შეამოწმეთ, თუ სულ სავსეა
    isFull() {
        return this.state.every(cell => cell);
    }
    /**
     * სიმბოლის დამატება symbol(x,o) ცარიელ უფრაში
     * @param {String} symbol 
     * @param {Number} position
     * @return {Boolean} ლოგიკურია ოპერაციის წარმატება
     */
    insert(symbol, position) {
        if(![0,1,2,3,4,5,6,7,8].includes(position)) {
            throw new Error(`Cell index ${position} does not exist!`)
        }
        if(!['x','o'].includes(symbol)) {
            throw new Error('The symbol can only be x or o!')
        }
        if(this.state[position]) {
            return false;
        }
    	this.state[position] = symbol;
    	return true;
    }
    // აბრუნებს მასივს, რომელიც შეიცავს არსებულ მოძრაობებს მიმდინარე მდგომარეობისთვის
    getAvailableMoves() {
        const moves = [];
        this.state.forEach((cell, index) => {
            if(!cell) moves.push(index); 
        });
        return moves;
    }
    /**
     * ამოწმებს არის თუ არა დამამთავრებელი მდგომარეობა, ანუ. მოთამაშე იმარჯვებს ან დაფა სავსეა და ფრეა
     * @return {Object} ობიექტი, რომელიც შეიცავს გამარჯვებულს, მოგების მიმართულებას და რიგის ნომერს
     */
    isTerminal() {
    	// დააბრუნეთ false, თუ დაფა ცარიელია
        if(this.isEmpty()) return false;
        // ჰორიზონტალური მოგებების შემოწმება
        if(this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
            return {'winner': this.state[0], 'direction': 'H', 'row': 1};
        }
        if(this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
            return {'winner': this.state[3], 'direction': 'H', 'row': 2};
        }
        if(this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
            return {'winner': this.state[6], 'direction': 'H', 'row': 3};
        }

        // ვერტიკალური მოგებების შემოწმება
        if(this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
            return {'winner': this.state[0], 'direction': 'V', 'column': 1};
        }
        if(this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
            return {'winner': this.state[1], 'direction': 'V', 'column': 2};
        }
        if(this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
            return {'winner': this.state[2], 'direction': 'V', 'column': 3};
        }

        // დიაგონალზე მოგებების შემოწმება
        if(this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
            return {'winner': this.state[0], 'direction': 'D', 'diagonal': 'main'};
        }
        if(this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
            return {'winner': this.state[2], 'direction': 'D', 'diagonal': 'counter'};
        }

        // თუ გამარჯვებული არ არის, მაგრამ დაფა სავსეა, მაშინ ფრეა
        if(this.isFull()) {
            return {'winner': 'draw'};
        }

        // დააბრუნე false სხვა ყველა შემთხვევაში
        return false;
    }
}
export default Board;