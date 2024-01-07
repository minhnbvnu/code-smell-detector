function getHasZM(geometry) {
  const layout = geometry.getLayout();
  return {
    hasZ: layout === 'XYZ' || layout === 'XYZM',
    hasM: layout === 'XYM' || layout === 'XYZM',
  };
}