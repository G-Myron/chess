const board = document.querySelector('.board');
const pieces = document.querySelectorAll('.piece');

// Create Board
for(i=0; i<8; i++){
    let row = document.createElement('tr');
    for(j=0; j<8; j++){
        let k = i%2? j: 7-j;    // To be colored and numbered corectly
        let square = document.createElement('td');
        square.classList.add('square');
        square.id = "sq" + (i*8 + k);
        row.appendChild(square);
    }
    board.appendChild(row);
}

const squares = document.querySelectorAll(".square");

//------------------ Functions -----------------------

function initializePieces() {
    pieces.forEach((piece,i)=>{
        piece.color = piece.classList[1];
        piece.square = ()=> findPieceSquare(piece);
        piece.moved = false;

        makeDragable(piece);
        placePieces(piece,i, boardLeft, boardTop);
    });
    findMoves();
}

function placePieces(piece,i, boardLeft, boardTop) {
    piece.setAttribute('style',`left:${boardLeft + i%8*squareSize}px;
        top:${boardTop + (Math.floor(i/8) + 4*Math.floor(i/16) +.5)*squareSize}px`);
    putPieceOnSquare(piece);
}

