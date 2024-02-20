function initializeSettings() {
  // enable this if we are the "master" presenter
  $("#followerToggle").prop("checked", master);
  mode.update = $("#followerToggle").prop("checked");
}