function controlAutoPilot() {
    if (autoPilot) {
      autoPilot = false;
      $("#controlAutoPilotButton").text("Start");
    } else {
      autoPilot = true;
      $("#controlAutoPilotButton").text("Stop");
    }
  }