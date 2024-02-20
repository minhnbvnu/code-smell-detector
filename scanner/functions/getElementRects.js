function getElementRects({ anchor, floating }) {
  return {
    anchor: getRectRelativeToOffsetParent(anchor, floating.offsetParent),
    floating: {
      x: 0,
      y: 0,
      width: floating.offsetWidth,
      height: floating.offsetHeight,
    },
  };
}