function Checkbox_possibleConstructorReturn(self, call) {
  if (call && (Checkbox_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return Checkbox_assertThisInitialized(self);
}