function makeSphere(id, pose = DFLT_POSE, points = DFLT_POINTS, action = ACTION.ADD) {
  return makeMarker(id, TYPE.SPHERE, action, pose, {points});
}