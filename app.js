$(document).ready(function() {
  $(".btn-default").prop("disabled", true);

  var board = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9"];
  //configs
  var picked = false;
  var playerSign = "";
  var pcSign = "";
  var turnSign;
  //arrays which store the players moves
  var player = [];
  var pc = [];
  //[LOGIC FUNCTIONS]

  //checks if there is a winner
  function checkCombo(turnPlayer) {
    var winCombos = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];
    var combined = player.concat(pc);

    for (x = 0; x < winCombos.length; x++) {
      if (
        turnPlayer.indexOf(winCombos[x][0]) > -1 &&
        turnPlayer.indexOf(winCombos[x][1]) > -1 &&
        turnPlayer.indexOf(winCombos[x][2]) > -1
      ) {
        picked = false;
        if (turnPlayer == player) {
          alert("Winner: PLAYER!");
        } else if (turnPlayer == pc) {
          alert("Winner: PC!");
        }
        combined = [];
        $("#reset").trigger("click");
      }
    }
    if (combined.length > 8) {
      combined = [];
      picked = false;
      alert("It's a TIE!");
      $("#reset").trigger("click");
    }
  }

  //retrieves an int from the id and pushes it to player or pc array;
  function pushChoice(currentPlayer, index) {
    var retrieveNumber = board[index];
    var finalRetrieve = parseInt(retrieveNumber[1]);
    currentPlayer.push(finalRetrieve);
  }

  //generate AI play
  function pcPick(x) {
    if (picked) {
      var randomN = Math.floor(Math.random() * board.length);
      $(board[randomN]).html(pcSign);
      $(board[randomN]).prop("disabled", true);
      pushChoice(pc, randomN);
      board.splice(randomN, 1);
      checkCombo(pc);
    }
  }

  //performs all the play button actions
  function clickIteration(clickId, pushInt) {
    $(clickId).html(playerSign);
    $(clickId).prop("disabled", true);
    player.push(pushInt);
    board.splice(board.indexOf(clickId), 1);
    checkCombo(player);
    pcPick();
  }

  //[MENU BUTTONS]
  $("#X").on("click", function() {
    $("#mTitle").html('You are player "X"');
    $("#X, #O").prop("disabled", true);
    $(".btn-default").prop("disabled", false);
    playerSign = "X";
    pcSign = "O";
    picked = true;
  });

  $("#O").on("click", function() {
    $("#mTitle").html('You are player "O"');
    $("#X, #O").prop("disabled", true);
    $(".btn-default").prop("disabled", false);
    playerSign = "O";
    pcSign = "X";
    picked = true;
    pcPick();
  });

  $("#reset").on("click", function() {
    $("#mTitle").html("Choose X or O to start playing");
    $("#X, #O").prop("disabled", false);
    $(".btn-default").prop("disabled", true);
    $("#1,#2,#3,#4,#5,#6,#7,#8,#9").html("");
    board = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9"];
    player = [];
    pc = [];
    picked = false;
  });

  //[BOARD BUTTONS]]
  $("#1").on("click", function() {
    clickIteration("#1", 1);
  });

  $("#2").on("click", function() {
    clickIteration("#2", 2);
  });

  $("#3").on("click", function() {
    clickIteration("#3", 3);
  });

  $("#4").on("click", function() {
    clickIteration("#4", 4);
  });

  $("#5").on("click", function() {
    clickIteration("#5", 5);
  });

  $("#6").on("click", function() {
    clickIteration("#6", 6);
  });

  $("#7").on("click", function() {
    clickIteration("#7", 7);
  });

  $("#8").on("click", function() {
    clickIteration("#8", 8);
  });

  $("#9").on("click", function() {
    clickIteration("#9", 9);
  });
});
