function getCoveringOrthoProjection(points, targetViewMatrix, near, far, height) {
  const p = transformVec3(targetViewMatrix.data, points[0]);
  let left   = p[0];
  let right  = p[0];
  let top    = p[1];
  let bottom = p[1];

  points.forEach(point => {
    const p = transformVec3(targetViewMatrix.data, point);
    left   = Math.min( left,  p[0]);
    right  = Math.max( right, p[0]);
    top    = Math.max( top,   p[1]);
    bottom = Math.min( bottom,p[1]);
  });

  return new GLX.Matrix.Ortho(left, right, top, bottom, near, far);
}