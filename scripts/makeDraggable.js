function makeDragable(piece) {
    var startPos =[];
    var square =null;
    piece.onmousedown = piece.ontouchstart = (event)=> {
        if(playersTurn != piece.color) return;
        onClick(event);
        document.onmousemove = piece.ontouchmove = onMove;
        document.onmouseup = piece.ontouchend = onMouseUp;
    }


    function onClick(e) {
        e.preventDefault();
        if(e.type==='touchstart') e = e.changedTouches[0];  // Touch screen
        lift(piece, e);
        square = piece.square();
        startPos = [piece.style.left, piece.style.top];
        [posX, posY] = [e.clientX, e.clientY];
        piece.movesAllowed = piece.findMoves();
        showMoves(piece.movesAllowed);
    }

    function onMove(e) {
        e.preventDefault();
        if(e.type==='touchmove') e = e.changedTouches[0];   // Touch screen
        [dy, dx] = [posY - e.clientY, posX - e.clientX];
        piece.style.top = Number.parseFloat(piece.style.top) - dy + "px";
        piece.style.left = Number.parseFloat(piece.style.left) - dx + "px";
        [posX, posY] = [e.clientX, e.clientY];
    }

    function onMouseUp() {
        document.onmouseup = document.onmousemove = piece.ontouchmove = piece.ontouchend = null;
        if(!putPieceOnSquare(piece, square)) { // If piece was not placed, return in previous position
            [piece.style.left, piece.style.top] = startPos;
            putPieceOnSquare(piece, square);
        }
        if(piece.square() != square) { // If pice has changed square
            piece.moved = true;
            if(playersTurn == "white") playersTurn="black";
            else playersTurn="white";   // Change the player that plays next
        }
        hideAllMoves();
        checkKings();
    }
    
    
    function lift(elmt, event) {
        old = document.querySelector(".lifted");
        if(old) old.classList.toggle("lifted");
        elmt.classList.toggle("lifted");
        let currentSquare = findSquare(event.clientX, event.clientY);
        if(currentSquare) currentSquare.piece = null;
    }
}

