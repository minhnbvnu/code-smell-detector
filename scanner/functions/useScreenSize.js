function useScreenSize() {
  const [size] = Object(react["useState"])(getScreenSize()); // TODO: We could subscribe to screen size changes.

  return size;
}