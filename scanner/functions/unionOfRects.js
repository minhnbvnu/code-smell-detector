function unionOfRects(...rects) {
  if (rects.length === 0) {
    return zeroRect;
  }

  const [firstRect, ...remainingRects] = rects;
  const boxUnion = remainingRects.map(rectToBox).reduce((intermediateUnion, nextBox) => {
    const [unionTop, unionRight, unionBottom, unionLeft] = intermediateUnion;
    const [nextTop, nextRight, nextBottom, nextLeft] = nextBox;
    return [Math.min(unionTop, nextTop), Math.max(unionRight, nextRight), Math.max(unionBottom, nextBottom), Math.min(unionLeft, nextLeft)];
  }, rectToBox(firstRect));
  return boxToRect(boxUnion);
}