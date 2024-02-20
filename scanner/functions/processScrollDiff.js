function processScrollDiff(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent,
  disableOnYReachWhenNoScroll
) {
  if (useScrollingClass === void 0) useScrollingClass = true;
  if (forceFireReachEvent === void 0) forceFireReachEvent = false;

  var fields;
  if (axis === "top") {
    fields = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down",
    ];
  } else if (axis === "left") {
    fields = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right",
    ];
  } else {
    throw new Error("A proper axis should be provided");
  }

  processScrollDiff$1(
    i,
    diff,
    fields,
    useScrollingClass,
    forceFireReachEvent,
    disableOnYReachWhenNoScroll
  );
}