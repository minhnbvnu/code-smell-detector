function Portal_possibleConstructorReturn(self, call) {
  if (call && (Portal_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return Portal_assertThisInitialized(self);
}