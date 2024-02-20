function runGameboy() {
  start(new GameBoyCanvas(), decoded_gameboy_rom);

  gameboy.instructions = 0;
  gameboy.totalInstructions = 250000;

  while (gameboy.instructions <= gameboy.totalInstructions) {
    gameboy.run();
    GameBoyAudioNode.run();
  }

  resetGlobalVariables();
}