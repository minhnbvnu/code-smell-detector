function setOrientationCache() {
  device.orientation = findMatch(['portrait', 'landscape']);
}