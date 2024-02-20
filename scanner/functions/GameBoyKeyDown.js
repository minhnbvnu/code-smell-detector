function GameBoyKeyDown(e) {
  if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
    var keycode = matchKey(e.keyCode);
    if (keycode >= 0 && keycode < 8) {
      gameboy.JoyPadEvent(keycode, true);
      try {
        e.preventDefault();
      }
      catch (error) { }
    }
  }
}