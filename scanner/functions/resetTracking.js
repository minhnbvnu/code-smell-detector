function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}