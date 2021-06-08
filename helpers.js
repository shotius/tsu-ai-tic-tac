//Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)
export function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else
      return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
export function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}
export function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else if (hasClass(el, className)) {
       var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
       el.className = el.className.replace(reg, " ");
    }
}

// დამხმარე ფუნქცია, რომელიც იღებს isTerminal () - დან დაბრუნებულ ობიექტს და ამატებს a
// კლასი დაფაზე, რომელიც გაუმკლავდება გამარჯვებული ხაზის ანიმაციის ხატვას
export function drawWinningLine(statusObject) {
	if(!statusObject) return;
	const { winner, direction, row, column, diagonal } = statusObject;
	if(winner === 'draw') {
        document.getElementById('layout').style.display = "flex"; 
        return 0;
    }
    	const board = document.getElementById("board");
    addClass(board, `${direction.toLowerCase()}-${row || column || diagonal}`);
    setTimeout(() => { 
        addClass(board, 'fullLine');
       setTimeout(() => {
        document.getElementById('layout').style.display = "flex"; 
       },650) 
     }, 50);
}