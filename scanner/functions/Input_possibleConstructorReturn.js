function Input_possibleConstructorReturn(self, call) {
  if (call && (Input_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return Input_assertThisInitialized(self);
}