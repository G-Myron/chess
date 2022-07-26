function endGame(color) {
    color = color=="white"? "black":"white";
    let winnerMsg = color+" wins!";
    alert(winnerMsg.toUpperCase());
    // Add a div in front so game cannot continue
}

