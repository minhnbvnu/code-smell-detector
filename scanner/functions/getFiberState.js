function getFiberState(root, workInProgress) {
  if (!root) {
    return null;
  }
  return describeFibers(root.current, workInProgress);
}