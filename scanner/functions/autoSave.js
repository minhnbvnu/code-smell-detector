function autoSave() {
  if (GameBoyEmulatorInitialized()) {
    cout("Automatically saving the SRAM.", 0);
    saveSRAM();
    saveRTC();
  }
}