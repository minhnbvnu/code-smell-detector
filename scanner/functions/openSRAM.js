function openSRAM(filename) {
  try {
    if (findValue("B64_SRAM_" + filename) != null) {
      cout("Found a previous SRAM state (Will attempt to load).", 0);
      return base64ToArray(findValue("B64_SRAM_" + filename));
    }
    else if (findValue("SRAM_" + filename) != null) {
      cout("Found a previous SRAM state (Will attempt to load).", 0);
      return findValue("SRAM_" + filename);
    }
    else {
      cout("Could not find any previous SRAM copy for the current ROM.", 0);
    }
  }
  catch (error) {
    cout("Could not open the  SRAM of the saved emulation state.", 2);
  }
  return [];
}