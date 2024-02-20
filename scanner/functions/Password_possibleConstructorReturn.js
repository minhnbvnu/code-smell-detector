function Password_possibleConstructorReturn(self, call) {
  if (call && (Password_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return Password_assertThisInitialized(self);
}