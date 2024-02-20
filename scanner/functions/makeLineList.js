function makeLineList(id, pose = DFLT_POSE, points = DFLT_POINTS, action = ACTION.ADD) {
  return makeMarker(id, TYPE.LINE_LIST, action, pose, {points});
}