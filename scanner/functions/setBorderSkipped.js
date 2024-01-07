function setBorderSkipped(properties, options, stack, index) {
  let edge = options.borderSkipped;
  const res = {};

  if (!edge) {
    properties.borderSkipped = res;
    return;
  }

  if (edge === true) {
    properties.borderSkipped = {top: true, right: true, bottom: true, left: true};
    return;
  }

  const {start, end, reverse, top, bottom} = borderProps(properties);

  if (edge === 'middle' && stack) {
    properties.enableBorderRadius = true;
    if ((stack._top || 0) === index) {
      edge = top;
    } else if ((stack._bottom || 0) === index) {
      edge = bottom;
    } else {
      res[parseEdge(bottom, start, end, reverse)] = true;
      edge = top;
    }
  }

  res[parseEdge(edge, start, end, reverse)] = true;
  properties.borderSkipped = res;
}