function neutralFill(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
  const referenceIndex = palette.closestIndexOf(reference);
  const threshold = Math.max(restDelta, hoverDelta, activeDelta, focusDelta);
  const direction = referenceIndex >= threshold ? -1 : 1;
  return {
    rest: palette.get(referenceIndex + direction * restDelta),
    hover: palette.get(referenceIndex + direction * hoverDelta),
    active: palette.get(referenceIndex + direction * activeDelta),
    focus: palette.get(referenceIndex + direction * focusDelta)
  };
}