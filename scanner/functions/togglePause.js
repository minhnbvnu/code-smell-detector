function togglePause() {
  try {
    slaveWindow.togglePause();
  }
  catch (e) {
    $("#pauseScreen").toggle();
  }
}