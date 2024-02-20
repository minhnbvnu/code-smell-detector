function openRTC(filename) {
  try {
    if (findValue("RTC_" + filename) != null) {
      cout("Found a previous RTC state (Will attempt to load).", 0);
      return findValue("RTC_" + filename);
    }
    else {
      cout("Could not find any previous RTC copy for the current ROM.", 0);
    }
  }
  catch (error) {
    cout("Could not open the RTC data of the saved emulation state.", 2);
  }
  return [];
}