function TextArea_possibleConstructorReturn(self, call) {
  if (call && (TextArea_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return TextArea_assertThisInitialized(self);
}