function fitBoxes(boxes, chartArea, params, stacks) {
  const refitBoxes = [];
  let i, ilen, layout, box, refit, changed;

  for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;

    box.update(
      layout.width || chartArea.w,
      layout.height || chartArea.h,
      getMargins(layout.horizontal, chartArea)
    );
    const {same, other} = updateDims(chartArea, params, layout, stacks);

    // Dimensions changed and there were non full width boxes before this
    // -> we have to refit those
    refit |= same && refitBoxes.length;

    // Chart area changed in the opposite direction
    changed = changed || other;

    if (!box.fullSize) { // fullSize boxes don't need to be re-fitted in any case
      refitBoxes.push(layout);
    }
  }

  return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}