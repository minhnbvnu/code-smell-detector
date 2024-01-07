function getScale(extent, size, metersPerUnit, dpi) {
  const mcsW = getWidth(extent);
  const mcsH = getHeight(extent);
  const devW = size[0];
  const devH = size[1];
  const mpp = 0.0254 / dpi;
  if (devH * mcsW > devW * mcsH) {
    return (mcsW * metersPerUnit) / (devW * mpp); // width limited
  }
  return (mcsH * metersPerUnit) / (devH * mpp); // height limited
}