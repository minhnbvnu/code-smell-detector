function initNewCanvas() {
  if (GameBoyEmulatorInitialized()) {
    gameboy.canvas.width = gameboy.canvas.clientWidth;
    gameboy.canvas.height = gameboy.canvas.clientHeight;
  }
}