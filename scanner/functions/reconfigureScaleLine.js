function reconfigureScaleLine() {
  map.removeControl(control);
  map.addControl(scaleControl());
}