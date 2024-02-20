function applyVerticalRules(
  relativeConstraints,
  childPositions,
  childName,
  blockSize
) {
  const position = childPositions[childName];
  position.top = -1;
  position.bottom = -1;

  const c = relativeConstraints[childName] || {};
  if (c.above && childPositions[c.above])
    position.bottom = childPositions[c.above].top;

  if (c.below && childPositions[c.below])
    position.top = childPositions[c.below].bottom;

  if (c.alignTop && childPositions[c.alignTop])
    position.top = childPositions[c.alignTop].top;

  if (c.alignBottom && childPositions[c.alignBottom])
    position.bottom = childPositions[c.alignBottom].bottom;

  if (c.alignParentTop) position.top = 0;

  if (c.alignParentBottom && blockSize !== null) position.bottom = blockSize;
}