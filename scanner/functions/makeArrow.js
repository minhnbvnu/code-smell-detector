function makeArrow(id, pose = DFLT_POSE, points = DFLT_POINTS, action = ACTION.ADD) {
  return makeMarker(id, TYPE.ARROW, action, pose, {points});
}