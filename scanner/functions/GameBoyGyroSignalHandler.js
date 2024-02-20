function GameBoyGyroSignalHandler(e) {
  if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
    if (e.gamma || e.beta) {
      gameboy.GyroEvent(e.gamma * Math.PI / 180, e.beta * Math.PI / 180);
    }
    else {
      gameboy.GyroEvent(e.x, e.y);
    }
    try {
      e.preventDefault();
    }
    catch (error) { }
  }
}