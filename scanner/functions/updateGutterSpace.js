function updateGutterSpace(cm) {
  var width = cm.display.gutters.offsetWidth;
  cm.display.sizer.style.marginLeft = width + "px";
}