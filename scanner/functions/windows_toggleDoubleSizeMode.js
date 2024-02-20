function windows_toggleDoubleSizeMode() {
  return withWindowGraphIntegrity({
    type: TOGGLE_DOUBLESIZE_MODE
  });
}