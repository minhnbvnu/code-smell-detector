function nodesToSegments (
  children,
  state
) {
  var segments = [];
  for (var i = 0; i < children.length; i++) {
    var c = children[i];
    if (c.type === 1) {
      segments.push.apply(segments, elementToSegments(c, state));
    } else if (c.type === 2) {
      segments.push({ type: INTERPOLATION, value: c.expression });
    } else if (c.type === 3) {
      segments.push({ type: RAW, value: c.text });
    }
  }
  return segments
}