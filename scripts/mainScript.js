const squareSize = Number.parseFloat(getComputedStyle(squares[0]).height);
var boardTop = board.offsetTop;
var boardLeft = board.offsetLeft;
var playersTurn = "white";

//------------------------- MAIN --------------------------------
window.onload = ()=> {
    [boardTop, boardLeft] = [board.offsetTop, board.offsetLeft];
    initializePieces();
};


window.onresize = ()=> {
    [boardTopOld, boardLeftOld] = [boardTop, boardLeft];
    [boardTop, boardLeft] = [board.offsetTop, board.offsetLeft];

    pieces.forEach((piece)=>{
        piece.style.top =  Number.parseFloat(piece.style.top) + boardTop - boardTopOld + "px";
        piece.style.left = Number.parseFloat(piece.style.left) + boardLeft - boardLeftOld + "px";
        // centerInSquare(piece);
    });
};



