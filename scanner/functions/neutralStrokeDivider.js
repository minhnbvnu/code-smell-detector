function neutralStrokeDivider(palette, reference, delta) {
  return palette.get(palette.closestIndexOf(reference) + directionByIsDark(reference) * delta);
}