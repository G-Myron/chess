
function findSquare(x,y) { // Find which square contains these coordinates
    for(let square of squares) {
        let squarePos = square.getBoundingClientRect();
        if (x > squarePos.left && x < squarePos.right && y > squarePos.top && y < squarePos.bottom) {
            return square;
        }
    }
    return null;
}
function findPieceSquare(piece) { // Find which square contains this piece
    let piecePos = piece.getBoundingClientRect();
    let pieceLeft = piecePos.left + squareSize/2;
    let pieceTop = piecePos.top + squareSize/2;
    return findSquare(pieceLeft, pieceTop); // The square that has that piece
}

function eatPiece(piece, pieceColor) {
    let n = document.querySelectorAll(`.${pieceColor}.eaten`).length; // How many of this color are eaten
    let side = pieceColor=="black"? board.getBoundingClientRect().width : -squareSize; // Pick side to send the piece
    
    // Eat the piece and send it out of the board
    piece.style.left = boardLeft +side +'px';
    piece.style.top = boardTop + n*squareSize +'px';
    piece.classList.add("eaten");
    square.piece = null;
}

function centerInSquare(square, piece) {
    piece.style.left = square.getBoundingClientRect().left +'px';
    piece.style.top = square.getBoundingClientRect().top +'px';
    square.piece = piece;
    return true;
}

function putPieceOnSquare(piece) {
    square = findPieceSquare(piece); // Find in which square is the piece
    if(!square) return false;

    // Define allowed moves
    // if(piece.movesAllowed && ! piece.movesAllowed.includes(square)) {
    //     return false;
    // }
    if(square.piece && piece.classList[1]!=square.piece.classList[1]) { // If square is not empty and has opponent
        eatPiece(square.piece, square.piece.classList[1]);
    }
    if(!square.piece) { // If square is empty
        return centerInSquare(square, piece);
    }
    return false;
}

