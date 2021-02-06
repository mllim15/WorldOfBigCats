$(document).ready(function () {
    // 9 box puzzle
    let rows = 3, columns = 3;
    let puzzlePieces = "";

    // loop to create divs for the puzzle pieces
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            puzzlePieces += "<div class='piece'></div>";
        }
    }
    $(".imgContainer").html(puzzlePieces);

})