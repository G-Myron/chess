
function findAllPiecesMoves(){   // Called in initialization
    findMovesPiece = (piece, findMovesFunction) => {
        piece.findMoves = function() {
            square = piece.square();
            if (!square) return [];
            
            let moves = findMovesFunction(square, piece);
            return moves.map( m=> { // map int list to objects list
                    let moveSq = BOARD.querySelector("#sq"+m);
                    if(moveSq && (!moveSq.piece || moveSq.piece.color!=piece.color)) // empty or opponent square
                        return moveSq;
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
    let moves = [square.num];

    for(let i=square.num-1; i>square.num-8; i--) {    // Find row
        if(i<0 || i>=64) break;
        if(Number.parseInt(i/8) == square.row) moves.push(i);
        if(!isEmptySq(i)) break;
    }
    for(let i=square.num+1; i<square.num+8; i++) {    // Find row
        if(i<0 || i>=64) break;
        if(Number.parseInt(i/8) == square.row) moves.push(i);
        if(!isEmptySq(i)) break;
    }
    for(let i=square.num+8; i<64; i+=8) { // Find column
        moves.push(i);
        if(!isEmptySq(i)) break;
    }
    for(let i=square.num-8; i>=square.column; i-=8) { // Find column
        moves.push(i);
        if(!isEmptySq(i)) break;
    }

    return moves;
}

function findMovesHorse(square, piece) {   // HORSE MOVES
    let moves = [square.num];

    if(square.column<7) moves.push(square.num-15, square.num+17);
    if(square.column<6) moves.push(square.num-6, square.num+10);
    if(square.column>1) moves.push(square.num+6, square.num-10);
    if(square.column>0) moves.push(square.num+15, square.num-17);

    return moves;
}

function findMovesBishop(square, piece) {   // BISHOP MOVES
    let moves = [square.num];

    // for(let i=1; i<8; i++) {
    //     if( (sqNum-i)%8 < square.column && (sqNum-i)%8>=0) {
    //         moves.push(sqNum - 9*i);
    //         moves.push(sqNum + 7*i);
    //     }
    //     if( (sqNum+i)%8 > square.column ) {
    //         moves.push(sqNum - 7*i);
    //         moves.push(sqNum + 9*i);
    //     }
    // }
    
    for(let i=1; i<8; i++) {    // top left diagonal
        let newSqNum = square.num - 9*i;
        if( newSqNum>=0 && (square.num-i)%8 < square.column && (square.num-i)%8>=0) {
            moves.push(newSqNum);
            if(!isEmptySq(newSqNum)) break;
        }
    }
    for(let i=1; i<8; i++) {    // bottom left diagonal
        let newSqNum = square.num + 7*i;
        if( newSqNum<64 && (square.num-i)%8 < square.column && (square.num-i)%8>=0) {
            moves.push(newSqNum);
            if(!isEmptySq(newSqNum)) break;
        }
    }
    for(let i=1; i<8; i++) {    // top right diagonal
        let newSqNum = square.num - 7*i;
        if( newSqNum>=0 && (square.num+i)%8 > square.column) {
            moves.push(newSqNum);
            if(!isEmptySq(newSqNum)) break;
        }
    }
    for(let i=1; i<8; i++) {    // bottom right diagonal
        let newSqNum = square.num + 9*i;
        if( newSqNum<64 && (square.num+i)%8 > square.column) {
            moves.push(newSqNum);
            if(!isEmptySq(newSqNum)) break;
        }
    }

    return moves;
}

function findMovesPawn(square, piece) {   // PAWN MOVES
    let moves = [square.num];

    let front = piece.color==="black"? +8:-8;
    
    if(front>0 && square.row==7 || front<0 && square.row==0) return moves;
    if(isEmptySq(square.num+ front)) {
            moves.push(square.num + front);
        if((front>0 && square.row==1 || front<0 && square.row==6) && isEmptySq(square.num+ 2*front))
            moves.push(square.num + 2*front);
    }

    if(square.column>0 && !isEmptySq(square.num+front-1))
        moves.push(square.num + front-1);
    if(square.column<7 && !isEmptySq(square.num+front+1))
        moves.push(square.num + front+1);
    
    // EN PASSANT
    if(pawnDoubleMove) {
        let enPNum = pawnDoubleMove.square().num;
        if(enPNum == square.num+1) {
            moves.push(square.num+front+1);
            enPassant = piece;
        }
        if(enPNum == square.num-1) {
            moves.push(square.num+front-1);
            enPassant = piece;
        }
    }

    return moves;
}

function findMovesQueen(square, piece) {   // QUEEN MOVES
    let moves = findMovesRook(square,piece).concat(findMovesBishop(square,piece));
    return moves;
}

function findMovesKing(square, piece) {   // KING MOVES
    let moves = [square.num, square.num-8, square.num+8];
    let rooks = document.querySelectorAll(".rook."+piece.color);
    
    if(square.column>0) moves.push(square.num-1, square.num-9, square.num+7);
    if(square.column<7) moves.push(square.num+1, square.num+9, square.num-7);

    // ROKE / CASTLING
    let i=-1;   // Iterator for castling
    if(!piece.moved && !rooks[0].moved && isEmptySq(square.num-1)&&isEmptySq(square.num-2)&&isEmptySq(square.num-3)) {
        for(i=0; i<3; i++)  // Check if there are threatened squares for big roke
            if( !SQUARES[square.num-i].isnotThreatened(piece.color)) break;
        if(i==3) moves.push(square.num-2);
    }
    if(!piece.moved && !rooks[1].moved && isEmptySq(square.num+1)&&isEmptySq(square.num+2)) {
        for(i=0; i<3; i++)  // Check if there are threatened squares for small roke
            if( !SQUARES[square.num+i].isnotThreatened(piece.color)) break;
        if(i==3) moves.push(square.num+2);
    }

    return moves;
}




function isEmptySq(numOfSquare) {
    return BOARD.querySelector("#sq"+ numOfSquare).piece? false: true;
}

function showMoves(moves) {
    moves.forEach(sq=> {
        if(sq==null || sq.childElementCount) return;
        let childSq = document.createElement('div');
        childSq.classList.add('availiable');
        sq.appendChild(childSq);
    });
}

function hideAllMoves() {
    document.querySelectorAll(".availiable").forEach(c=> c.remove())
}

