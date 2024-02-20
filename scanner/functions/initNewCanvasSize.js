function initNewCanvasSize() {
  if (GameBoyEmulatorInitialized()) {
    if (!settings[12]) {
      if (gameboy.onscreenWidth != 160 || gameboy.onscreenHeight != 144) {
        gameboy.initLCD();
      }
    }
    else {
      if (gameboy.onscreenWidth != gameboy.canvas.clientWidth || gameboy.onscreenHeight != gameboy.canvas.clientHeight) {
        gameboy.initLCD();
      }
    }
  }
}