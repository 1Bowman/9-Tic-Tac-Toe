// 9tictactoe.js
// Alex Bowman 2016

// ----------------
// Global variables
// ----------------

// Vars for each game
var xClicked = [];
var oClicked = [];

// Vars for entire game.
var xWon = [];
var oWon = [];
var currentMapSquare;

var allSquares = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
var allMapSquares = ["m11", "m12", "m13", "m21", "m22", "m23", "m31", "m32", "m33"];


// Disable showing the thing by default
$('#myModal').modal({show: false})

// Run this code on page load
$( document ).ready( function() {
	// Set initial score value to 0
	$("#score").text(0);

	// Display a welcome modal, telling the player to
	// select which square on the left to play for.
	$('#modalText').text("Welcome");
	// We can keep this one to carry through until the game is won overall.
	$('#modalSubText').text("Please select a square on the right to play for.");
	$('#myModal').modal("show");

	$(".mapsquare").click( function(e){
		// Ignore click if map square has already been selected
		if(currentMapSquare !== undefined) {
			return;
		}
		currentMapSquare = $(this).attr('id');
		
		if (xWon.indexOf(currentMapSquare) < 0 && xWon.indexOf(currentMapSquare) < 0) {
			$(this).text("?");
			$(this).addClass("mapsquare-initial-click");
		}
	});

	//Event handler for main game clicking
	$(".t3square").click( function(e) {
		// Catch clicks to the game before choosing a square
		if (currentMapSquare === undefined) { 
			alert("Please click which square to play for before placing")
			return;
		}
		// If the box has been clicked before, run this block
		if (xClicked.indexOf($(this).attr('id')) < 0 && oClicked.indexOf($(this).attr('id')) < 0) {
			// Add our clicked value to the list of values that X has clicked
			xClicked.push($(this).attr('id'));

			$(this).text("X");
			$(this).css("background-color", "#2C3E50");
			$(this).css("color", "white");
			$(this).css("font-size", "400%");

			// if X wins, reset the game
			if (checkWin("X") == true) { return; }

			// Run our AI function once our player has placed an X
			oAI("t3");
		} else { 
			// Run this block if box has been clicked before
			console.log("Can't click this square")
		}
	});
});

function oAI(curGrid) {
	var validSpace = false;
	if (curGrid === "t3") {
		while (!validSpace){
			var randItem = allSquares[Math.floor(Math.random() * allSquares.length)];
			if (xClicked.length + oClicked.length > 8){
				// break out of the loop if all squares have been chosen
				break;
			}
			if (xClicked.indexOf(randItem) < 0 && oClicked.indexOf(randItem) < 0){
				validSpace = true;
				// Add our value to our clicked array
				oClicked.push(randItem);

				var selectedItem = $("#" + randItem);
				selectedItem.css("background-color", "#B4BCC2");
				selectedItem.css("font-size", "400%");
				selectedItem.css("color", "white");
				selectedItem.text("O");
			}
		}
		checkWin("O")
	} else if (curGrid == "map") {
		while (!validSpace){
			var randItem = allMapSquares[Math.floor(Math.random() * allSquares.length)];
			if (xWon.length + oWon.length > 8){
				// break out of the loop if all squares have been chosen
				break;
			}
			if (xWon.indexOf(randItem) < 0 && oWon.indexOf(randItem) < 0){
				validSpace = true;
				currentMapSquare = randItem;
			}
		}
		
	}

	

}

function checkWin(curLetter) {
	console.log(xClicked, oClicked);
	tempArr = new Array();
	winValue = false;
	tieValue = false;

	if (curLetter === "X") {
		// Check for X, individual game
		tempArr = xClicked;
	} else if (curLetter === "O") {
		// Check for O, individual game
		tempArr = oClicked
	}

	// Tedious logic to check for a winning combination.
	if (tempArr.indexOf("11") > -1 && tempArr.indexOf("12") > -1 && tempArr.indexOf("13") > -1){
		winValue = true;
	} else if (tempArr.indexOf("21") > -1 && tempArr.indexOf("22") > -1 && tempArr.indexOf("23") > -1){
		winValue = true;
	} else if (tempArr.indexOf("31") > -1 && tempArr.indexOf("32") > -1 && tempArr.indexOf("33") > -1){
		winValue = true;
	} else if (tempArr.indexOf("11") > -1 && tempArr.indexOf("21") > -1 && tempArr.indexOf("31") > -1){
		winValue = true;
	} else if (tempArr.indexOf("12") > -1 && tempArr.indexOf("22") > -1 && tempArr.indexOf("32") > -1){
		winValue = true;
	} else if (tempArr.indexOf("13") > -1 && tempArr.indexOf("23") > -1 && tempArr.indexOf("33") > -1){
		winValue = true;
	} else if (tempArr.indexOf("11") > -1 && tempArr.indexOf("22") > -1 && tempArr.indexOf("33") > -1){
		winValue = true;
	} else if (tempArr.indexOf("31") > -1 && tempArr.indexOf("22") > -1 && tempArr.indexOf("13") > -1){
		winValue = true;
	} else if (xClicked.length + oClicked.length === 9){
		tieValue = true;
    } else {
		winValue = false;
	}

	if (winValue === true && tieValue === false) {
		// Add to the overall count of who has won and edit the win text
		if (curLetter === "X") {
			// Set the text of the modal box
			$('#modalText').text("You won!");
			// Add our current square we're playing for to the win array of X
			xWon.push(currentMapSquare);

			// Change the CSS of the won square to that of the winner
			$("#"+currentMapSquare).text("X");
			$("#"+currentMapSquare).css("background-color", "#2C3E50");
			$("#"+currentMapSquare).css("color", "white");

			// oAI("map");
		} else if (curLetter === "O") {
			$('#modalText').text("The computer won!");
			// add current game piece to oWon array
			oWon.push(currentMapSquare);

			// Change the CSS of the won square to that of the winner
			$("#"+currentMapSquare).text("O");
			$("#"+currentMapSquare).css("background-color", "#B4BCC2");
			$("#"+currentMapSquare).css("color", "white");

			// Pick the next square
			oAI("map");
		}

		// Display the 'won' arrays on the console
		console.log(xWon, oWon);

		// Display the modal
		$('#myModal').modal('show');

		xClicked = [];
		oClicked = [];

		// Allows for our AI to pick the next square and not have it overwritten
		if (curLetter == "O"){
			$("#"+currentMapSquare).text("?");
			$("#"+currentMapSquare).addClass("mapsquare-initial-click");

		} else {
			currentMapSquare = undefined;
		}

		// Find each square and reset the css and text
		for (i = 0; i < allSquares.length; i++){
			// Get each particular item
			var curIterItem = $("#"+allSquares[i]);

			// Set the items properties back to default
			curIterItem.css("background-color", "white");
			curIterItem.css("color", "white");
			curIterItem.text("");
		}

		// Check for the possibility that the entire game was won
		checkFinalWin()

	} else if (tieValue === true && winValue === false) {
		// Set the text of the modal box
		$('#modalText').text("Cat");
		$('#myModal').modal('show');

		// reset css on sidemap
		$("#"+currentMapSquare).text("");
		$("#"+currentMapSquare).removeClass("mapsquare-initial-click");

		// Reset values
		xClicked = [];
		oClicked = [];
		currentMapSquare = undefined;

		// Find each square and reset the css and text
		for (i = 0; i < allSquares.length; i++){
			// Get each particular item
			var curIterItem = $("#"+allSquares[i]);

			// Set the items properties back to default
			curIterItem.css("background-color", "white");
			curIterItem.css("color", "white");
			curIterItem.text("");
		}
	}

	if (winValue === true){
		return true;
	} else {
		return false;
	}

}

function checkFinalWin() {
	// Loop over arrays of won squares to save space
	winArrays = [xWon, oWon];
	winValue = false;
	tieValue = false;

	for (let tempArr of winArrays) {
		// Tediously check each possibility of winning
		if (tempArr.indexOf("m11") > -1 && tempArr.indexOf("m12") > -1 && tempArr.indexOf("m13") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m21") > -1 && tempArr.indexOf("m22") > -1 && tempArr.indexOf("m23") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m31") > -1 && tempArr.indexOf("m32") > -1 && tempArr.indexOf("m33") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m11") > -1 && tempArr.indexOf("m21") > -1 && tempArr.indexOf("m31") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m12") > -1 && tempArr.indexOf("m22") > -1 && tempArr.indexOf("m32") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m13") > -1 && tempArr.indexOf("m23") > -1 && tempArr.indexOf("m33") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m11") > -1 && tempArr.indexOf("m22") > -1 && tempArr.indexOf("m33") > -1){
			winValue = true;
		} else if (tempArr.indexOf("m31") > -1 && tempArr.indexOf("m22") > -1 && tempArr.indexOf("m13") > -1){
			winValue = true;
		} else if (xWon.length + oWon.length === 9){
			tieValue = true;
	    }

		// Verify a win for either X or O
		if (winValue === true && tempArr === xWon) {
			// X Won!
			// alert("X won!");
			console.log("X won");

			$("#modalText").text("X HAS WON IT ALL!");
			$("#modalSubText").text("");
			$("#subtitle").text("Score: 1");
			break;
		} else if (winValue === true && tempArr === oWon) {
			// O Won!
			//alert("O Won!");
			console.log("O won");

			$("#modalText").text("O HAS WON IT ALL!");
			$("#modalSubText").text("");
			$("#subtitle").text("Score: -1");
			break;
		} else if (winValue === false && tieValue === true) {
			alert("CAT");
		}
	}
	for (i = 0; i < allSquares.length; i++){
		var curIterItem = $("#"+allSquares[i]);
		curIterItem.css("background-color", "white");
		curIterItem.css("color", "white");
		curIterItem.text("");
	}
}
