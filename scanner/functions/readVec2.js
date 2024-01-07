function readVec2(node) {
  const xunits = node.getAttribute('xunits');
  const yunits = node.getAttribute('yunits');
  /** @type {import('../style/Icon.js').IconOrigin} */
  let origin;
  if (xunits !== 'insetPixels') {
    if (yunits !== 'insetPixels') {
      origin = 'bottom-left';
    } else {
      origin = 'top-left';
    }
  } else {
    if (yunits !== 'insetPixels') {
      origin = 'bottom-right';
    } else {
      origin = 'top-right';
    }
  }
  return {
    x: parseFloat(node.getAttribute('x')),
    xunits: ICON_ANCHOR_UNITS_MAP[xunits],
    y: parseFloat(node.getAttribute('y')),
    yunits: ICON_ANCHOR_UNITS_MAP[yunits],
    origin: origin,
  };
}