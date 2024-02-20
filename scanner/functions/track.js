function track(current) {
  if (mode.track && ws.readyState == WebSocket.OPEN) {
    var slideName = $("#slideFilename").text() || $("#slideFile").text(); // yey for consistency

    if(current) {
      ws.send(JSON.stringify({ message: 'track', slide: slideName}));
    }
    else {
      var slideEndTime = new Date().getTime();
      var elapsedTime  = slideEndTime - slideStartTime;

      // reset the timer
      slideStartTime = slideEndTime;

      if (elapsedTime > 1000) {
        elapsedTime /= 1000;
        ws.send(JSON.stringify({ message: 'track', slide: slideName, time: elapsedTime}));
      }
    }
  }
}