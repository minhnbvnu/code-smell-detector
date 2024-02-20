function ContainerRender_possibleConstructorReturn(self, call) {
  if (call && (ContainerRender_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return ContainerRender_assertThisInitialized(self);
}