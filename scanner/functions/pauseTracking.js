function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}