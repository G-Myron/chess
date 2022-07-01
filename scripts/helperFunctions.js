
function findSquare(x,y) { // Find which square contains these coordinates
    for(let square of squares) {
        let squarePos = square.getBoundingClientRect();
        if (x > squarePos.left && x < squarePos.right && y > squarePos.top && y < squarePos.bottom) {
            return square;
        }
    }
    return null;
}

function eatPiece(piece, pieceColor) {
    let n = document.querySelectorAll(`.${pieceColor}.eaten`).length;
    let side = pieceColor=="black"? board.getBoundingClientRect().width : -squareSize;
    piece.style.left = boardLeft +side +'px';
    piece.style.top = boardTop + n*squareSize +'px';
    piece.classList.add("eaten");
    square.piece = null;
}

function putPieceOnSquare(square, piece) {
    piece.style.left = square.getBoundingClientRect().left +'px';
    piece.style.top = square.getBoundingClientRect().top +'px';
    square.piece = piece;
    return true;
}

function centerInSquare(piece) {
    // Find in which square is the piece
    let piecePos = piece.getBoundingClientRect();
    let pieceLeft = piecePos.left + squareSize/2;
    let pieceTop = piecePos.top + squareSize/2;
    square = findSquare(pieceLeft, pieceTop); // The square that has that piece
    if(!square) return false;

    // Define possible moves
    pieceColor = piece.classList[1];
    if(square.piece && pieceColor!=square.piece.classList[1]) { // If square is not empty and has opponent
        eatPiece(square.piece, square.piece.classList[1]);
    }
    if(!square.piece) { // If square is empty
        return putPieceOnSquare(square, piece);
    }
    return false;
}

