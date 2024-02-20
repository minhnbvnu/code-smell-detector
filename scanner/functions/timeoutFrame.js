function timeoutFrame(simulator, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function() { simulator(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }