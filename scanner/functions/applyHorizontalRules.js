function applyHorizontalRules(
  relativeConstraints,
  childPositions,
  childName,
  inlineSize
) {
  const position = childPositions[childName];
  position.left = -1;
  position.right = -1;

  const c = relativeConstraints[childName] || {};
  if (c.leftOf && childPositions[c.leftOf])
    position.right = childPositions[c.leftOf].left;

  if (c.rightOf && childPositions[c.rightOf])
    position.left = childPositions[c.rightOf].right;

  if (c.alignLeft && childPositions[c.alignLeft])
    position.left = childPositions[c.alignLeft].left;

  if (c.alignRight && childPositions[c.alignRight])
    position.right = childPositions[c.alignRight].right;

  if (c.alignParentLeft) position.left = 0;

  if (c.alignParentRight) position.right = inlineSize;
}