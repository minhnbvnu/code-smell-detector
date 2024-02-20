function toggleTimer() {
  if (!timerRunning) {
    timerRunning = true;
    $('#pauseTimer').val('Pause');
    $('#timerDisplay').removeClass('paused');
    $("#timerDisplay").TimeCircles().start();
  }
   else {
    timerRunning = false;
    $('#pauseTimer').val('Resume');
    $('#timerDisplay').addClass('paused');
    $("#timerDisplay").TimeCircles().stop();
  }
}