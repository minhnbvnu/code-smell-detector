function focusStrokeInner$1(palette, reference, focusColor) {
  return palette.colorContrast(focusColor, 3.5, palette.closestIndexOf(palette.source), directionByIsDark(reference) * -1);
}