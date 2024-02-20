function saveSRAM() {
  if (GameBoyEmulatorInitialized()) {
    if (gameboy.cBATT) {
      try {
        var sram = gameboy.saveSRAMState();
        if (sram.length > 0) {
          cout("Saving the SRAM...", 0);
          if (findValue("SRAM_" + gameboy.name) != null) {
            //Remove the outdated storage format save:
            cout("Deleting the old SRAM save due to outdated format.", 0);
            deleteValue("SRAM_" + gameboy.name);
          }
          setValue("B64_SRAM_" + gameboy.name, arrayToBase64(sram));
        }
        else {
          cout("SRAM could not be saved because it was empty.", 1);
        }
      }
      catch (error) {
        cout("Could not save the current emulation state(\"" + error.message + "\").", 2);
      }
    }
    else {
      cout("Cannot save a game that does not have battery backed SRAM specified.", 1);
    }
    saveRTC();
  }
  else {
    cout("GameBoy core cannot be saved while it has not been initialized.", 1);
  }
}