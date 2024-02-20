function checkSyncState() {
  if (presenterSlideNum != slidenum && presenterSlideNum != null) {
    $("#synchronize").show();
  }
  else {
    $("#synchronize").hide();
  }
}