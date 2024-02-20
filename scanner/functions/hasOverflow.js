function hasOverflow(element) {
  const overflowRegex = /(auto|scroll)/;
  const computedStyles = getComputedStyle(element, null);

  const overflow = computedStyles.getPropertyValue('overflow') + computedStyles.getPropertyValue('overflow-y') + computedStyles.getPropertyValue('overflow-x');

  return overflowRegex.test(overflow);
}