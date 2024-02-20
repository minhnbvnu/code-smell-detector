function makeLineStrip(id, pose = DFLT_POSE, points = DFLT_POINTS, action = ACTION.ADD) {
  return makeMarker(id, TYPE.LINE_STRIP, action, pose, {points});
}