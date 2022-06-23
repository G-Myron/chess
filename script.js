
const board = document.querySelector('.board');
const pieces = document.querySelectorAll('.piece');

// Create Board
for(i=0; i<8; i++){
    let row = document.createElement('tr');
    for(j=0; j<8; j++){
        let square = document.createElement('td');
        square.classList.add('square');
        row.appendChild(square);
    }
    board.appendChild(row);
}

const squares = document.querySelectorAll(".square");
const squareSize = Number.parseFloat(getComputedStyle(squares[0]).height);
var boardTop = board.offsetTop;
var boardLeft = board.offsetLeft;

//------------------------- MAIN --------------------------------
window.onload = ()=> {

[boardTop, boardLeft] = [board.offsetTop, board.offsetLeft];

pieces.forEach((piece,i)=>{
    dragElement(piece);
    placePieces(piece,i, boardLeft, boardTop);
    centerInSquare(piece);
});

};

window.onresize = ()=> {

[boardTopOld, boardLeftOld] = [boardTop, boardLeft];
[boardTop, boardLeft] = [board.offsetTop, board.offsetLeft];

pieces.forEach((piece)=>{
    piece.style.top =  Number.parseFloat(piece.style.top) + boardTop - boardTopOld + "px";
    piece.style.left = Number.parseFloat(piece.style.left) + boardLeft - boardLeftOld + "px";
    centerInSquare(piece);
});

};


function dragElement(elmnt) {
    elmnt.onmousedown = elmnt.ontouchstart = (e)=> {
        e.preventDefault();
        if(e.type=='touchstart') e = e.changedTouches[0];
        lift(elmnt);
        [posX, posY] = [e.clientX, e.clientY];
        document.onmousemove = elmnt.ontouchmove = (e)=> {
            e.preventDefault();
            if(e.type=='touchmove') e = e.changedTouches[0];
            [dy, dx] = [posY - e.clientY, posX - e.clientX];
            elmnt.style.top = Number.parseFloat(elmnt.style.top) - dy + "px";
            elmnt.style.left = Number.parseFloat(elmnt.style.left) - dx + "px";
            [posX, posY] = [e.clientX, e.clientY];
        }
        document.onmouseup = elmnt.ontouchend = ()=> {
            centerInSquare(elmnt);
            document.onmouseup = document.onmousemove = elmnt.ontouchmove = elmnt.ontouchend = null;
        }
    }
    
    function lift(elmt) {
        old = document.querySelector(".lifted");
        if(old) old.classList.toggle("lifted");
        elmt.classList.toggle("lifted");
    }
}


function placePieces(elmnt,i, boardLeft, boardTop) {
    elmnt.setAttribute('style',`left:${boardLeft + i%8*squareSize}px;
        top:${boardTop + (Math.floor(i/8) + 4*Math.floor(i/16))*squareSize}px`);
}

function centerInSquare(piece) {
    let piecePos = piece.getBoundingClientRect();
    for(square of squares){
        let squarePos = square.getBoundingClientRect();
        let pieceLeft = piecePos.left + squareSize/2;
        let pieceTop = piecePos.top + squareSize/2;
        if (pieceLeft > squarePos.left && pieceLeft < squarePos.right &&
                pieceTop > squarePos.top && pieceTop < squarePos.bottom) {
            piece.style.left = squarePos.left +'px';
            piece.style.top = squarePos.top +'px';
            return;
        }
    };
    console.log('OUT');
}



