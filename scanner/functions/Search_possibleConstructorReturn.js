function Search_possibleConstructorReturn(self, call) {
  if (call && (Search_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return Search_assertThisInitialized(self);
}