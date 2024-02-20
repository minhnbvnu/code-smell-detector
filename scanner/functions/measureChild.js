async function measureChild(child, position) {
  const childConstraints = {};

  if (position.top >= 0 && position.bottom >= 0)
    childConstraints.fixedBlockSize = Math.max(
      0,
      position.bottom - position.top
    );

  if (position.left >= 0 && position.right >= 0)
    childConstraints.fixedInlineSize = Math.max(
      0,
      position.right - position.left
    );

  return await child.layoutNextFragment(childConstraints);
}