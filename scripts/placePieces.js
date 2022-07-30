
function findSquare(x,y) { // Find which square contains these coordinates
    for(let square of SQUARES) {
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
    let side = piece.color=="black"? BOARD.getBoundingClientRect().width : -squareSize; // Pick side to send the piece

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
    piece.style.left = square.getBoundingClientRect().left +'px';
    piece.style.top = square.getBoundingClientRect().top +'px';
    square.piece = piece;
    if(piece.classList.contains("pawn") && (square.row<1 || square.row>6))
        pawnPromotion(piece);    // If a pawn reaches the end it promotes
    return true;
}


function putPieceOnSquare(piece, oldSquare=null) {
    square = piece.square();
    if(!square) return false;

    let sqDiff = oldSquare? square.num-oldSquare.num : NaN;

    // Define allowed moves
    if(piece.movesAllowed && ! piece.movesAllowed.includes(square)) { // This move is not allowed
        return false;
    }
    if( !piece.moved && piece.classList.contains("king") && oldSquare) { // Roke-Castling
        castling(piece, sqDiff);
    }
    if(enPassant==piece && pawnDoubleMove) { // En-Passant
        let enPSquare = pawnDoubleMove.square();
        let enPDiff = Math.abs(enPSquare.num-square.num);
        if(enPDiff==8) eatPiece(enPSquare.piece, enPSquare.piece.color);
    }
    if(sqDiff!=0) pawnDoubleMove=enPassant = null;    // Initialize en-passant global variables
    if(!piece.moved && piece.classList.contains("pawn") && oldSquare) { // En Passant - Check if pawn made double start
        if(Math.abs(sqDiff)==16) pawnDoubleMove=piece;
    }
    if(square.piece && square.piece.color!=piece.color) { // Square is occupied by opponent
        eatPiece(square.piece, square.piece.color);
    }
    if(!square.piece) { // Square is empty
        return centerInSquare(square, piece);
    }
    return false;
}

