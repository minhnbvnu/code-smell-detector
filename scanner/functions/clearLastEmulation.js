function clearLastEmulation() {
  if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
    clearInterval(gbRunInterval);
    gameboy.stopEmulator |= 2;
    cout("The previous emulation has been cleared.", 0);
  }
  else {
    cout("No previous emulation was found to be cleared.", 0);
  }
}