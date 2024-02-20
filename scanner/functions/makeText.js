function makeText(id, pose = DFLT_POSE, text = '', action = ACTION.ADD) {
  return makeMarker(id, TYPE.TEXT_VIEW_FACING, action, pose, {text});
}