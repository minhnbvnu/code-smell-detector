function centerWindowsInView() {
  return centerWindows({
    left: window.scrollX,
    top: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight
  });
}