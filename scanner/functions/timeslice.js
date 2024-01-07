function timeslice() {
  var immediateStart = new Date().getTime();
  while (immediateQueue.length && new Date().getTime() - immediateStart < 100) {
    immediateQueue.shift()();
  }
  if (immediateQueue.length) {
    immediateTimeout = setTimeout(timeslice, 0);
  } else {
    immediateTimeout = null;
  }
}