function tooltip_possibleConstructorReturn(self, call) {
  if (call && (tooltip_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return tooltip_assertThisInitialized(self);
}