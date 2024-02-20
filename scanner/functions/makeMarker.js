function makeMarker(id, type, action, pose, {points, text, scale = DFLT_SCALE}) {
  return {
    ns: 'test',
    id,
    type,
    action,
    pose,
    scale,
    lifetime: {
      sec: 0,
      nsec: 0
    },
    points,
    text,
    colors: {r: 0.5, g: 0.1, b: 0.1, a: 1}
  };
}