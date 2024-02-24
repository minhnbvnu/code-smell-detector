function isActiveFeature(e) {
  if (!e.featureTarget) return false;
  if (!e.featureTarget.properties) return false;
  return e.featureTarget.properties.active === Constants.activeStates.ACTIVE &&
    e.featureTarget.properties.meta === Constants.meta.FEATURE;
}