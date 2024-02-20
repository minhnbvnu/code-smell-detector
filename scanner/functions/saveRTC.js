function saveRTC() {  //Execute this when SRAM is being saved as well.
  if (GameBoyEmulatorInitialized()) {
    if (gameboy.cTIMER) {
      try {
        cout("Saving the RTC...", 0);
        setValue("RTC_" + gameboy.name, gameboy.saveRTCState());
      }
      catch (error) {
        cout("Could not save the RTC of the current emulation state(\"" + error.message + "\").", 2);
      }
    }
  }
  else {
    cout("GameBoy core cannot be saved while it has not been initialized.", 1);
  }
}