function openState(filename, canvas) {
  try {
    if (findValue(filename) != null) {
      try {
        clearLastEmulation();
        cout("Attempting to run a saved emulation state.", 0);
        gameboy = new GameBoyCore(canvas, "");
        gameboy.savedStateFileName = filename;
        gameboy.returnFromState(findValue(filename));
        run();
      }
      catch (error) {
        alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
      }
    }
    else {
      cout("Could not find the save state " + filename + "\".", 2);
    }
  }
  catch (error) {
    cout("Could not open the saved emulation state.", 2);
  }
}