function triggerReflow(tooltip, circle) {
  // Safari needs the specific 'transform' property to be accessed
  circle
    ? window.getComputedStyle(circle)[prefix('transform')]
    : window.getComputedStyle(tooltip).opacity
}