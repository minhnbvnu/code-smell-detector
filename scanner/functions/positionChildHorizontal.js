function positionChildHorizontal(
  position,
  constraint,
  inlineSize,
  childInlineSize
) {
  if (position.left < 0 && position.right >= 0) {
    // Right fixed, left unspecified.
    position.left = position.right - childInlineSize;
  } else if (position.left >= 0 && position.right < 0) {
    position.right = position.left + childInlineSize;
  } else if (position.left < 0 && position.right < 0) {
    // Both unspecified.
    const c = constraint || {};
    if (c.centerHorizontal) {
      position.left = (inlineSize - childInlineSize) / 2;
      position.right = position.left + childInlineSize;
    } else {
      position.left = 0;
      position.right = childInlineSize;
    }
  }
}