function accentFill(palette, neutralPalette, reference, hoverDelta, activeDelta, focusDelta, neutralFillRestDelta, neutralFillHoverDelta, neutralFillActiveDelta) {
  const accent = palette.source;
  const referenceIndex = neutralPalette.closestIndexOf(reference);
  const swapThreshold = Math.max(neutralFillRestDelta, neutralFillHoverDelta, neutralFillActiveDelta);
  const direction = referenceIndex >= swapThreshold ? -1 : 1;
  const accentIndex = palette.closestIndexOf(accent);
  const hoverIndex = accentIndex;
  const restIndex = hoverIndex + direction * -1 * hoverDelta;
  const activeIndex = restIndex + direction * activeDelta;
  const focusIndex = restIndex + direction * focusDelta;
  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex)
  };
}