async function measureChildHorizontal(child, position) {
  let childInlineSize = 0;
  if (position.left >= 0 && position.right >= 0) {
    childInlineSize = Math.max(0, position.right - position.left);
  } else {
    childInlineSize = (await child.layoutNextFragment({})).inlineSize;
  }

  return childInlineSize;
}