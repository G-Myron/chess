
function findMoves(){
    document.querySelectorAll(".rook").forEach( rook => {
        rook.findMoves = function() {
            square = rook.square();
            if (!square) return null;
            return findMovesRook(square);
        }
    } )
    document.querySelectorAll(".horse").forEach( horse => {
        horse.findMoves = function() {
            square = horse.square();
            if (!square) return null;
            return findMovesHorse(square);
        }
    } )
    document.querySelectorAll(".bishop").forEach( bishop => {
        bishop.findMoves = function() {
            square = bishop.square();
            if (!square) return null;
            return findMovesBishop(square);
        }
    } )
    document.querySelectorAll(".pawn").forEach( pawn => {
        pawn.findMoves = function() {
            square = pawn.square();
            if (!square) return null;
            return findMovesPawn(square, pawn.classList[1]);
        }
    } )
    document.querySelectorAll(".king").forEach( king => {
        king.findMoves = function() {
            square = king.square();
            if (!square) return null;
            return findMovesKing(square);
        }
    } )
    document.querySelectorAll(".queen").forEach( queen => {
        queen.findMoves = function() {
            square = queen.square();
            if (!square) return null;
            return findMovesQueen(square);
        }
    } )
}

function findMovesRook(square) {    // ROOK MOVES
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

    moves = moves.map(m=> { // map int list to objects list
        return board.querySelector("#sq"+m);
    });
    return moves;
}

function findMovesHorse(square) {   // HORSE MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [];

    if(column<7) moves.push(sqNum-15, sqNum+17);
    if(column<6) moves.push(sqNum-6, sqNum+10);
    if(column>1) moves.push(sqNum+6, sqNum-10);
    if(column>0) moves.push(sqNum+15, sqNum-17);

    moves = moves.map(m=> { // map int list to objects list
        return board.querySelector("#sq"+m);
    });
    return moves;
}

function findMovesBishop(square) {   // BISHOP MOVES
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

    moves = moves.map(m=> { // map int list to objects list
        return board.querySelector("#sq"+m);
    });
    return moves;
}

function findMovesPawn(square, color) {   // PAWN MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [sqNum];
    
    if(color==="black") {
        moves.push(sqNum+8);
        if(row==1) moves.push(sqNum+16);
    }
    if(color==="white") {
        moves.push(sqNum-8);
        if(row==6) moves.push(sqNum-16);
    }

    moves = moves.map(m=> { // map int list to objects list
        let move = board.querySelector("#sq"+m);
        if(move) return move;
    });
    return moves;
}

function findMovesKing(square) {   // KING MOVES
    let sqNum = Number(square.id.replace("sq", "")); // Get square's number
    let row = Number.parseInt(sqNum/8), column = sqNum%8;
    let moves = [sqNum, sqNum-8, sqNum+8];
    
    if(column>0) moves.push(sqNum-1, sqNum-9, sqNum+7);
    if(column<7) moves.push(sqNum+1, sqNum+9, sqNum-7);

    moves = moves.map(m=> { // map int list to objects list
        let move = board.querySelector("#sq"+m);
        if(move) return move;
    });
    return moves;
}

function findMovesQueen(square) {   // QUEEN MOVES
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

    moves = moves.map(m=> { // map int list to objects list
        let move = board.querySelector("#sq"+m);
        if(move) return move;
    });
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

