
function findMoves(){   // Called in initialization
    findMovesPiece = (piece, findMovesFunction) => {
        piece.findMoves = function() {
            square = piece.square();
            if (!square) return null;
            
            let moves = findMovesFunction(square, piece);
            return moves.map( m=> { // map int list to objects list
                    let moveSq = board.querySelector("#sq"+m);
                    if(moveSq && (!moveSq.piece || moveSq.piece.color!=piece.color)) return moveSq;
                });
        }
    }
    document.querySelectorAll(".rook").forEach( piece => findMovesPiece(piece, findMovesRook));
    document.querySelectorAll(".horse").forEach( piece => findMovesPiece(piece, findMovesHorse));
    document.querySelectorAll(".bishop").forEach( piece => findMovesPiece(piece, findMovesBishop));
    document.querySelectorAll(".pawn").forEach( piece => findMovesPiece(piece, findMovesPawn));
    document.querySelectorAll(".queen").forEach( piece => findMovesPiece(piece, findMovesQueen));
    document.querySelectorAll(".king").forEach( piece => findMovesPiece(piece, findMovesKing));
}

function findMovesRook(square, piece) {    // ROOK MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [];

    for(let i=sqNum-7; i<sqNum+8; i++) {    // Find row
        if(Number.parseInt(i/8) == row)
            moves.push(i);
    }
    for(let i=sqNum; i<64; i+=8) { // Find column
            moves.push(i);
    }
    for(let i=sqNum; i>=column; i-=8) { // Find column
            moves.push(i);
    }

    return moves;
}

function findMovesHorse(square, piece) {   // HORSE MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [sqNum];

    if(column<7) moves.push(sqNum-15, sqNum+17);
    if(column<6) moves.push(sqNum-6, sqNum+10);
    if(column>1) moves.push(sqNum+6, sqNum-10);
    if(column>0) moves.push(sqNum+15, sqNum-17);

    return moves;
}

function findMovesBishop(square, piece) {   // BISHOP MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [sqNum];

    for(let i=1; i<8; i++) {
        if( (sqNum-i)%8 < sqNum%8 && (sqNum-i)%8>=0) {
            moves.push(sqNum - 9*i);
            moves.push(sqNum + 7*i);
        }
        if( (sqNum+i)%8 > sqNum%8 ) {
            moves.push(sqNum - 7*i);
            moves.push(sqNum + 9*i);
        }
    }

    return moves;
}

function findMovesPawn(square, piece) {   // PAWN MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [sqNum];

    let front = piece.color==="black"? +8:-8;
    
    if(front>0 && row==7 || front<0 && row==0) return moves;
    if(!board.querySelector("#sq"+(sqNum+ front)).piece) {
            moves.push(sqNum + front);
        if((front>0 && row==1 || front<0 && row==6) && !board.querySelector("#sq"+(sqNum+ 2*front)).piece)
            moves.push(sqNum + 2*front);
    }

    if(column>0 && board.querySelector("#sq"+(sqNum+front-1)).piece)
        moves.push(sqNum + front-1);
    if(column<7 && board.querySelector("#sq"+(sqNum+front+1)).piece)
        moves.push(sqNum + front+1);

    return moves;
}

function findMovesQueen(square, piece) {   // QUEEN MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [];
    
    for(let i=sqNum-7; i<sqNum+8; i++) {    // Find row
        if(Number.parseInt(i/8) == row)
            moves.push(i);
    }
    for(let i=column; i<64; i+=8) { // Find column
            moves.push(i);
    }

    for(let i=1; i<8; i++) {        // Find diagonals
        if( (sqNum-i)%8 < sqNum%8 && (sqNum-i)%8>=0) {
            moves.push(sqNum - 9*i);
            moves.push(sqNum + 7*i);
        }
        if( (sqNum+i)%8 > sqNum%8 ) {
            moves.push(sqNum - 7*i);
            moves.push(sqNum + 9*i);
        }
    }

    return moves;
}

function findMovesKing(square, piece) {   // KING MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [sqNum, sqNum-8, sqNum+8];
    
    if(column>0) moves.push(sqNum-1, sqNum-9, sqNum+7);
    if(column<7) moves.push(sqNum+1, sqNum+9, sqNum-7);

    return moves;
}




function showMoves(moves) {
    moves.forEach(sq=> {
        if(sq==null || sq.childElementCount) return;
        let childSq = document.createElement('div');
        childSq.classList.add('marked');
        sq.appendChild(childSq);
    });
}

function hideAllMoves() {
    document.querySelectorAll(".marked").forEach(c=> c.remove())
}

