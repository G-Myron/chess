var promotionPawn, promotionBoard

/* GAME TERMINATION */

function endGame(color) {
    color = color=="white"? "black":"white";
    let winnerMsg = color+" wins!";
    const winnerBox = document.querySelector("#winnerCard");
    winnerBox.querySelector(".winner-msg").innerHTML = winnerMsg.toUpperCase();
    winnerBox.classList.toggle("visible-flex");
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


