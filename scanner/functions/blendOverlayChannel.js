function blendOverlayChannel(bottom, top) {
  if (bottom < 0.5) {
    return clamp(2.0 * top * bottom, 0, 1);
  }

  return clamp(1.0 - 2.0 * (1.0 - top) * (1.0 - bottom), 0, 1);
}