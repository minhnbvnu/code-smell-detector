function createDivider(frame) {
  const divider = NSView.alloc().initWithFrame(frame);

  divider.setWantsLayer(1);
  divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1.0));

  return divider;
}