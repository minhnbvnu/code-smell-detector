function isReturnableFrameType(type) {
  return (
    isMethodFrameType(type) ||
    isFunctionFrameType(type)
  );
}