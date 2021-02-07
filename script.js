$(document).ready(function () {
    // 9 box puzzle
    let rows = 3, columns = 3;

    startingPuzzle();

    $("#solve").click(function () {
        solveClicked();
    });

    // actions when reset button is clicked
    $("#reset").click(function () {
        resetClicked();
    });

    // function for the start of the puzzle
    function startingPuzzle() {
        let puzzlePieces = "";

        /* loop to create divs for the puzzle pieces
           and change top and left positions of the image
           images are 540px x 540px, 3 puzzle pieces in each row = 540/3 */
        for (let i = 0, topPosition = 0; i < rows; i++, topPosition -= 180) {
            for (let j = 0, leftPosition = 0; j < columns; j++, leftPosition -= 180) {
                puzzlePieces += "<div class='piece' style='background-position:" + leftPosition + "px " + topPosition + "px;'></div>";
            }
        }
        $(".imgContainer").html(puzzlePieces);
    }

    // when solve is clicked do this
    function solveClicked() {
        let puzzlePieces = $(".imgContainer div");
        // randomize the left and top positions of the puzzle pieces
        puzzlePieces.each(function () {
            let randomLeftPosition = Math.floor(Math.random() * 370);
            let randomTopPosition = Math.floor(Math.random() * 370);
            // add draggable class to puzzle pieces
            $(this).addClass("draggable").css({
                position: "absolute",
                left: randomLeftPosition + "px",
                top: randomTopPosition + "px"
            })
            // add the randomized puzzle pieces to the other container
            $(".puzzleContainer").append($(this))
        });

        // loop from above to create outline for the puzzle piece
        let emptyPuzzlePieces = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // add droppable class to the outline divs
                emptyPuzzlePieces += "<div class='piece droppable' style='background-image: none;'></div>";
            }
        }
        $(".imgContainer").html(emptyPuzzlePieces);
        // hide the solve button
        $("#solve").attr("hidden", true);
        // show the reset button
        $("#reset").attr("hidden", false);

        draggableAndDroppableOn();

        // if all droppable places are full, check to see if the pieces are in correct place
        //isDroppableSpaceFull();
    }

    // when reset is clicked do this
    function resetClicked() {
        // hide the reset button
        $("#reset").attr("hidden", true);
        // show the solve button
        $("#solve").attr("hidden", false);

        // remove all divs of the puzzle pieces from both containers
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                $(".draggable").remove();
                $(".droppable").remove();
            }
        }

        // recreate start of puzzle
        startingPuzzle();
    }

    // make randomized puzzle pieces draggable
    function draggableAndDroppableOn() {
        $(".draggable").draggable();
        $(".droppable").droppable({
            // conditions to check that only one puzzle piece can be dropped to one empty outline piece
            drop: function (event, ui) {
                let draggablePiece = ui.draggable;
                let droppableSpace = $(this);

                droppableSpace.addClass("full");
                $(draggablePiece).addClass("dropped").css({
                    left: 0, top: 0, position: "relative", border: "none"
                }).appendTo(droppableSpace);
            }
        });
    }

    /* check if puzzle is finished
    function isDroppableSpaceFull() {
        // if all droppable places are full, check to see if the pieces are in correct place
        if ($(".imgContainer div.full").length == $(".imgContainer div").length) {
            console.log("true");
        }
    }
    */
})

