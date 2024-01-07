function encodeGeometryLayout(geom) {
  const layout = geom.getLayout();
  let dimInfo = '';
  if (layout === 'XYZ' || layout === 'XYZM') {
    dimInfo += Z;
  }
  if (layout === 'XYM' || layout === 'XYZM') {
    dimInfo += M;
  }
  return dimInfo;
}