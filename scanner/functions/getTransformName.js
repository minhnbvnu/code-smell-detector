function getTransformName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "Transform") : 'transform';
}