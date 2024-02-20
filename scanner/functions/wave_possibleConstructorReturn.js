function wave_possibleConstructorReturn(self, call) {
  if (call && (wave_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return wave_assertThisInitialized(self);
}