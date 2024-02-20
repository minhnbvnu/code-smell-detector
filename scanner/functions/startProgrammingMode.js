function startProgrammingMode() {
    if (programming_mode_switch) {
      programming_mode_switch = false;
      $("#programmingModeButton").text("Enable Prog. Mode");
    } else {
      document.getElementById("gameContainer").style.width = "100%";
      document.getElementById("gameContainer").style.height = "100%";
      document.getElementById("loadButtonGroup").style.width = "1250px";

      programming_mode_switch = true;
      game_mode_switch = false;
      $("#gameModeButton").text("Enable Game Mode");
      $("#programmingModeButton").text("Disable Prog. Mode");
    }
    if (chaos_program_screen.style.display === "none") {
      chaos_program_screen.style.display = "block";
    } else {
      chaos_program_screen.style.display = "none";
    }
    if (programming_mode_buttons.style.display === "none") {
        programming_mode_buttons.style.display = "block";
    } else {
      programming_mode_buttons.style.display = "none";
    }
    game_buttons.style.display = "none";
    game_screen.style.display = "none";
  }