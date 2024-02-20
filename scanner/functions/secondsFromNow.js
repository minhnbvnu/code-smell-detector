function secondsFromNow(seconds) {
  var now = new Date();
  now.setTime(now.getTime() + seconds * 1000);
  return now;
}