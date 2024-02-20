function popconfirm_possibleConstructorReturn(self, call) {
  if (call && (popconfirm_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return popconfirm_assertThisInitialized(self);
}