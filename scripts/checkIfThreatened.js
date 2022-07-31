SQUARES.forEach( (square)=> {
    square.isThreatened = function(color="") {  // Array
        let opponents, threateners=[], wasEmpty=false;
        if(square.piece==null && color=='black') {
            wasEmpty=true;
            square.piece = BLACKS[0];
            opponents = WHITES;
        }
        else if(square.piece==null && color=='white') {
            wasEmpty=true;
            square.piece = WHITES[0];
            opponents = BLACKS;
        }
        else if(square.piece==null) opponents=PIECES;
        else if(square.piece.color == "black") opponents = WHITES;
        else if(square.piece.color == "white") opponents = BLACKS;

        opponents.forEach( (piece)=> {
            if(!piece.id.includes('king')   // Checking for Roke creates infinite loop
                && piece.findMoves().includes(square))
                threateners.push(piece);
        });
        
        if(wasEmpty) square.piece = null;
        return threateners;
    }
    
    square.isnotThreatened = function(color="") {   // Boolean
        if(square.isThreatened(color).length==0) return true;
        return false;
    }
})

PIECES.forEach( (piece)=> {
    piece.isThreatened = ()=> piece.square().isThreatened();
    piece.isnotThreatened = ()=> piece.square().isnotThreatened();
})


