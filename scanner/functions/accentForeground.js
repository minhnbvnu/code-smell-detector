function accentForeground(palette, reference, contrastTarget, restDelta, hoverDelta, activeDelta, focusDelta) {
  const accent = palette.source;
  const accentIndex = palette.closestIndexOf(accent);
  const direction = directionByIsDark(reference);
  const startIndex = accentIndex + (direction === 1 ? Math.min(restDelta, hoverDelta) : Math.max(direction * restDelta, direction * hoverDelta));
  const accessibleSwatch = palette.colorContrast(reference, contrastTarget, startIndex, direction);
  const accessibleIndex1 = palette.closestIndexOf(accessibleSwatch);
  const accessibleIndex2 = accessibleIndex1 + direction * Math.abs(restDelta - hoverDelta);
  const indexOneIsRestState = direction === 1 ? restDelta < hoverDelta : direction * restDelta > direction * hoverDelta;
  let restIndex;
  let hoverIndex;

  if (indexOneIsRestState) {
    restIndex = accessibleIndex1;
    hoverIndex = accessibleIndex2;
  } else {
    restIndex = accessibleIndex2;
    hoverIndex = accessibleIndex1;
  }

  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(restIndex + direction * activeDelta),
    focus: palette.get(restIndex + direction * focusDelta)
  };
}