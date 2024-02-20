function GameBoyEmulatorPlaying() {
  return ((gameboy.stopEmulator & 2) == 0);
}