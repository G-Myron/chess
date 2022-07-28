var promotionPawn, promotionBoard

function endGame(color) {
    color = color=="white"? "black":"white";
    let winnerMsg = color+" wins!";
    alert(winnerMsg.toUpperCase());
    // Add a div in front so game cannot continue
}

function pawnPromotion(pawn, pieceName="queen", promFunction=findMovesQueen) {
    promotionBoard = document.querySelector("#"+pawn.color+"-promotion");
    promotionBoard.classList.toggle("visible-flex");
    promotionPawn = pawn;
}

function pawnPromote(pieceName="queen", promFunction=findMovesQueen) {
    pawn = promotionPawn;
    pawn.classList.replace("pawn", pieceName);
    pawn.src = 'pieces/'+pawn.color[0]+'-'+pieceName+".png";
    findMovesPiece(pawn, promFunction);
    
    promotionBoard.classList.toggle("visible-flex");
}
function pawnPromoteQueen() {
    pawnPromote("queen", findMovesQueen);
}
function pawnPromoteRook() {
    pawnPromote("rook", findMovesRook);
}
function pawnPromoteBishop() {
    pawnPromote("bishop", findMovesBishop);
}
function pawnPromoteHorse() {
    pawnPromote("horse", findMovesHorse);
}


