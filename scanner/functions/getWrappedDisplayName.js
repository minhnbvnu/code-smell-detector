function getWrappedDisplayName(outerType, innerType, wrapperName, fallbackName) {
  const displayName = outerType.displayName;
  return displayName || `${wrapperName}(${getDisplayName(innerType, fallbackName)})`;
}