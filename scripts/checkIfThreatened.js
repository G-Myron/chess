
SQUARES.forEach( (square)=> {
    square.isThreatened = function() {
        let opponents = PIECES;
        if(square.piece && square.piece.color == "black") opponents = WHITES;
        if(square.piece && square.piece.color == "white") opponents = BLACKS;
        let threateners = [];
        opponents.forEach( piece=> {
            if(piece.findMoves().includes(square))
                threateners.push(piece);
        });
        return threateners;
    }
})
PIECES.forEach( (piece)=> {
    piece.isThreatened = ()=> piece.square().isThreatened();
})


