function Group_possibleConstructorReturn(self, call) {
  if (call && (Group_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return Group_assertThisInitialized(self);
}