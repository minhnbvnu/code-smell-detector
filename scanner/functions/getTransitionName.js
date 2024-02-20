function getTransitionName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "TransitionProperty") : 'transitionProperty';
}