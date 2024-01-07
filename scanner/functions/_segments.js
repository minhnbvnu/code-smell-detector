function _segments(line, target, property) {
  const segments = line.segments;
  const points = line.points;
  const tpoints = target.points;
  const parts = [];

  for (const segment of segments) {
    let {start, end} = segment;
    end = _findSegmentEnd(start, end, points);

    const bounds = _getBounds(property, points[start], points[end], segment.loop);

    if (!target.segments) {
      // Special case for boundary not supporting `segments` (simpleArc)
      // Bounds are provided as `target` for partial circle, or undefined for full circle
      parts.push({
        source: segment,
        target: bounds,
        start: points[start],
        end: points[end]
      });
      continue;
    }

    // Get all segments from `target` that intersect the bounds of current segment of `line`
    const targetSegments = _boundSegments(target, bounds);

    for (const tgt of targetSegments) {
      const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
      const fillSources = _boundSegment(segment, points, subBounds);

      for (const fillSource of fillSources) {
        parts.push({
          source: fillSource,
          target: tgt,
          start: {
            [property]: _getEdge(bounds, subBounds, 'start', Math.max)
          },
          end: {
            [property]: _getEdge(bounds, subBounds, 'end', Math.min)
          }
        });
      }
    }
  }
  return parts;
}