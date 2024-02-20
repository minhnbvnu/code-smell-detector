function isBreakableFrameType(type) {
  return (
    isLoopFrameType(type) ||
    isSwitchFrameType(type)
  );
}