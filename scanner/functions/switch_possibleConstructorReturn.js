function switch_possibleConstructorReturn(self, call) {
  if (call && (switch_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return switch_assertThisInitialized(self);
}