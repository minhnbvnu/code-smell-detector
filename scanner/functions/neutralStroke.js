function neutralStroke(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
  const referenceIndex = palette.closestIndexOf(reference);
  const direction = directionByIsDark(reference);
  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);
  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex)
  };
}