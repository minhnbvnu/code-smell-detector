function button_possibleConstructorReturn(self, call) {
  if (call && (button_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return button_assertThisInitialized(self);
}