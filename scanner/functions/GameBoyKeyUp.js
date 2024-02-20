function GameBoyKeyUp(e) {
  if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
    var keycode = matchKey(e.keyCode);
    if (keycode >= 0 && keycode < 8) {
      gameboy.JoyPadEvent(keycode, false);
      try {
        e.preventDefault();
      }
      catch (error) { }
    }
  }
}