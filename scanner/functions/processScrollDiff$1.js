function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent,
  disableOnYReachWhenNoScroll
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if (useScrollingClass === void 0) useScrollingClass = true;
  if (forceFireReachEvent === void 0) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  const eventFlag =
    disableOnYReachWhenNoScroll === true
      ? i[contentHeight] !== i[containerHeight]
      : true;

  // 1 for subpixel rounding
  if (eventFlag && element[scrollTop] < 1) {
    i.reach[y] = "start";
  }

  // 1 for subpixel rounding
  if (
    eventFlag &&
    element[scrollTop] > i[contentHeight] - i[containerHeight] - 1
  ) {
    i.reach[y] = "end";
  }

  if (diff) {
    element.dispatchEvent(createEvent("ps-scroll-" + y));

    if (diff < 0) {
      element.dispatchEvent(createEvent("ps-scroll-" + up));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent("ps-scroll-" + down));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent("ps-" + y + "-reach-" + i.reach[y]));
  }
}