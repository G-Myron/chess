
function findSquare(x,y) { // Find which square contains these coordinates
    for(let square of squares) {
        let squarePos = square.getBoundingClientRect();
        if (x > squarePos.left && x < squarePos.right && y > squarePos.top && y < squarePos.bottom) {
            return square;
        }
    }
    return null;
}

function centerInSquare(piece) {
    let piecePos = piece.getBoundingClientRect();
    let pieceLeft = piecePos.left + squareSize/2;
    let pieceTop = piecePos.top + squareSize/2;
    square = findSquare(pieceLeft, pieceTop);
    if(!square) return;
    if(!square.piece) {
        piece.style.left = square.getBoundingClientRect().left +'px';
        piece.style.top = square.getBoundingClientRect().top +'px';
        square.piece = piece;
        return true;
    }
    return false;
}

