function getTransform({vehiclePose, streamMetadata, viewport}) {
  // TODO - handle coordinate systems
  const SCALE = 10;

  return p => {
    if (Number.isFinite(p)) {
      return p * SCALE;
    }
    return [p[0] * SCALE + viewport.width / 2, p[1] * SCALE + viewport.height / 2, p[2] * SCALE];
  };
}