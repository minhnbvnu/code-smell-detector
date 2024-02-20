function guttersChanged(cm) {
  updateGutters(cm);
  regChange(cm);
  alignHorizontally(cm);
}