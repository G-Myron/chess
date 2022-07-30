
Squares.forEach( (square)=> {
    square.isThreatened = function() {
        let whites = PIECES;
        if(square.piece && square.piece.color == "black") whites = WHITES;
        if(square.piece && square.piece.color == "white") whites = BLACKS;
        let threateners = [];
        whites.forEach( piece=> {
            if(piece.findMoves().includes(square))
                threateners.push(piece);
        });
        return threateners;
    }
})


