
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

function eatPiece(piece) {
    let n = document.querySelectorAll(`.${piece.color}.eaten`).length; // How many of this color are eaten
    let side = piece.color=="black"? board.getBoundingClientRect().width : -squareSize; // Pick side to send the piece

    // Eat the piece and send it out of the board
    piece.style.left = boardLeft +side +'px';
    piece.style.top = boardTop + n*squareSize +'px';
    piece.classList.add("eaten");
    square.piece = null;
    
    // Check if game ends
    if(piece.classList.contains("king"))
        endGame(piece.color);    // If king is eaten
}

function centerInSquare(square, piece) {
    let sqNum = Number(square.id.replace("sq", ""));
    let row = Number.parseInt(sqNum/8);

    piece.style.left = square.getBoundingClientRect().left +'px';
    piece.style.top = square.getBoundingClientRect().top +'px';
    square.piece = piece;
    if(piece.classList.contains("pawn") && (row<1 || row>6))
        pawnPromotion(piece);    // If a pawn reaches the end it promotes
    return true;
}


function putPieceOnSquare(piece, oldSquare=null) {
    square = piece.square(); // Find in which square is the piece
    if(!square) return false;

    // Define allowed moves
    if(piece.movesAllowed && ! piece.movesAllowed.includes(square)) { // This move is not allowed
        return false;
    }
    if( !piece.moved && piece.classList.contains("king") && oldSquare) { // Roke-Castling
        let sqDiff = square.id.replace('sq','') - oldSquare.id.replace('sq','');
        castling(piece, sqDiff);
    }
    if(square.piece && square.piece.color!=piece.color) { // Square is occupied by opponent
        eatPiece(square.piece, square.piece.color);
    }
    if(!square.piece) { // Square is empty
        return centerInSquare(square, piece);
    }
    return false;
}

