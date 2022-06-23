const board = document.querySelector('.board');
const pieces = document.querySelectorAll('.piece');

// Create Board
for(i=0; i<8; i++){
    let row = document.createElement('tr');
    for(j=0; j<8; j++){
        let square = document.createElement('td');
        square.classList.add('square');
        square.id = "sq" + (i*8+j);
        row.appendChild(square);
    }
    board.appendChild(row);
}

const squares = document.querySelectorAll(".square");

//------------------ Functions -----------------------

function initializePieces() {
    pieces.forEach((piece,i)=>{
        makeDragable(piece);
        placePieces(piece,i, boardLeft, boardTop);
    });
}

function makeDragable(elmnt) {
    elmnt.onmousedown = elmnt.ontouchstart = (e)=> {
        e.preventDefault();
        if(e.type==='touchstart') e = e.changedTouches[0];
        lift(elmnt, e);
        startPos = [elmnt.style.left, elmnt.style.top];
        [posX, posY] = [e.clientX, e.clientY];
        document.onmousemove = elmnt.ontouchmove = (e)=> {
            e.preventDefault();
            if(e.type==='touchmove') e = e.changedTouches[0];
            [dy, dx] = [posY - e.clientY, posX - e.clientX];
            elmnt.style.top = Number.parseFloat(elmnt.style.top) - dy + "px";
            elmnt.style.left = Number.parseFloat(elmnt.style.left) - dx + "px";
            [posX, posY] = [e.clientX, e.clientY];
        }
        document.onmouseup = elmnt.ontouchend = ()=> {
            document.onmouseup = document.onmousemove = elmnt.ontouchmove = elmnt.ontouchend = null;
            if(!centerInSquare(elmnt)) {
                [elmnt.style.left, elmnt.style.top] = startPos;
                centerInSquare(elmnt);
            }
        }
    }
    
    function lift(elmt, event) {
        old = document.querySelector(".lifted");
        if(old) old.classList.toggle("lifted");
        elmt.classList.toggle("lifted");
        let square = findSquare(event.clientX, event.clientY);
        if(square) square.piece = null;
    }
}


function placePieces(piece,i, boardLeft, boardTop) {
    piece.setAttribute('style',`left:${boardLeft + i%8*squareSize}px;
        top:${boardTop + (Math.floor(i/8) + 4*Math.floor(i/16) +.5)*squareSize}px`);
    centerInSquare(piece);
}

