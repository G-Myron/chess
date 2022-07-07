
function makeDragable(piece) {
    piece.onmousedown = piece.ontouchstart = (event)=> {
        onClick(event);

        document.onmousemove = piece.ontouchmove = onMove;

        document.onmouseup = piece.ontouchend = onMouseUp;
    }

    function onClick(e) {
        e.preventDefault();
        if(e.type==='touchstart') e = e.changedTouches[0];  // Touch screen
        lift(piece, e);
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
        if(!putPieceOnSquare(piece)) {
            [piece.style.left, piece.style.top] = startPos;
            putPieceOnSquare(piece);
        }
        hideAllMoves();
    }
    
    function lift(elmt, event) {
        old = document.querySelector(".lifted");
        if(old) old.classList.toggle("lifted");
        elmt.classList.toggle("lifted");
        let square = findSquare(event.clientX, event.clientY);
        if(square) square.piece = null;
    }
}

