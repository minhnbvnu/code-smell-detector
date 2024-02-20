function startGameMode() {
    if (game_mode_switch) {
      game_mode_switch = false;
      $("#gameModeButton").text("Enable Game Mode");
    } else {
      game_mode_switch = true;
      document.getElementById("gameContainer").style.width = "50%";
      document.getElementById("gameContainer").style.height = "50%";
      //document.getElementById("loadButtonGroup").style.width = "650px";
      $("#gameModeButton").text("Disable Game Mode");
      $("#programmingModeButton").text("Enable Prog. Mode");
      programming_mode_switch = false;
    }
    if (game_buttons.style.display === "none") {
      game_buttons.style.display = "block";
    } else {
      game_buttons.style.display = "none";
    }
    if (game_screen.style.display === "none") {
      game_screen.style.display = "block";
    } else {
      game_screen.style.display = "none";
    }
    chaos_program_screen.style.display = "none";
    programming_mode_buttons.style.display = "none";
  }