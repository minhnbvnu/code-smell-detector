function calcProgressBarSteps() {
  var n = 0;
  forEachUsableArtboard(function() {
    n += 2;
  });
  return n;
}