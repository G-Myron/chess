var promotionPawn, promotionBoard, pawnDoubleMove=null, enPassant=null;

/* GAME TERMINATION */

function endGame(color) {
    color = color=="white"? "black":"white";
    let winnerMsg = color+" wins!";
    const winnerBox = document.querySelector("#winnerCard");
    winnerBox.querySelector(".winner-msg").innerHTML = winnerMsg.toUpperCase();
    winnerBox.classList.toggle("visible-flex");
}

/* CHECK */

function checkKings() {
    let wKCheck = document.querySelector("#w-king").isThreatened();
    let bKCheck = document.querySelector("#b-king").isThreatened();
    if(wKCheck.length) alert(wKCheck);
    if(bKCheck.length) alert(bKCheck);
}


/* PAWN PROMOTION */

function pawnPromotion(pawn) {  // Open the options to chose
    promotionBoard = document.querySelector("#"+pawn.color+"-promotion");
    promotionBoard.classList.toggle("visible-flex");
    promotionPawn = pawn;
}

function pawnPromote(pieceName="queen", promFunction=findMovesQueen) {  // Choose from the options
    pawn = promotionPawn;
    pawn.classList.replace("pawn", pieceName);
    pawn.src = 'pieces/'+pawn.color[0]+'-'+pieceName+".png";
    findMovesPiece(pawn, promFunction);
    
    promotionBoard.classList.toggle("visible-flex");
}


/* CASTLING - ROKE */

function castling(king, sqDiff) {
    if(sqDiff==2 || sqDiff==-2) {
        let rook = document.querySelectorAll(".rook."+ king.color)[(sqDiff+2)/4]; // rooks[0/1]
        let rookSq = document.querySelector("#sq"+(square.num - sqDiff/2)) // id+-1
        rook.square().piece = null;
        centerInSquare(rookSq, rook);
    }
}


