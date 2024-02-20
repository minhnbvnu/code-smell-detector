function stopTimer() {
  $("#timerDisplay").removeData('timer');
  $("#timerDisplay").TimeCircles().destroy();

  $("#timerLabel").show();
  $("#minStart").show();

  $("#stopTimer").hide();
  $("#pauseTimer").hide();
  $("#timerDisplay").hide();
  $('#timerSection').removeClass();

  // only unpin when the user has dismissed the timer
  unpinSidebar('timer');
}