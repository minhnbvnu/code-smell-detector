function isGesture(value) {
  return Object.keys(gestureMap).some(name => value.startsWith(name));
}