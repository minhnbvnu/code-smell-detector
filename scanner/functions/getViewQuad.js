function getViewQuad(viewProjectionMatrix, maxFarEdgeDistance, viewDirOnMap) {
  // maxFarEdgeDistance: maximum distance from the map center at which geometry is still visible

  const inverseViewMatrix = GLX.Matrix.invert(viewProjectionMatrix);

  let
    vBottomLeft  = getIntersectionWithXYPlane(-1, -1, inverseViewMatrix),
    vBottomRight = getIntersectionWithXYPlane( 1, -1, inverseViewMatrix),
    vTopRight    = getIntersectionWithXYPlane( 1,  1, inverseViewMatrix),
    vTopLeft     = getIntersectionWithXYPlane(-1,  1, inverseViewMatrix);

  // If even the lower edge of the screen does not intersect with the map plane,
  // then the map plane is not visible at all. We won't attempt to create a view rectangle.

  if (!vBottomLeft || !vBottomRight) {
    return;
  }

  let
    vLeftDir, vRightDir, vLeftPoint, vRightPoint,
    f;

  // The lower screen edge intersects map plane, but the upper one does not.
  // Usually happens when the camera is close to parallel to the ground
  // so that the upper screen edge lies above the horizon. This is not a bug
  // and can legitimately happen. But from a theoretical standpoint, this means
  // that the view 'trapezoid' stretches infinitely toward the horizon. Since this
  // is not useful we manually limit that area.

  if (!vTopLeft || !vTopRight) {
    // point on the left screen edge with the same y-value as the map center*/
    vLeftPoint = getIntersectionWithXYPlane(-1, -0.9, inverseViewMatrix);
    vLeftDir = norm2(sub2(vLeftPoint, vBottomLeft));
    f = dot2(vLeftDir, viewDirOnMap);
    vTopLeft = add2( vBottomLeft, mul2scalar(vLeftDir, maxFarEdgeDistance/f));
    
    vRightPoint = getIntersectionWithXYPlane( 1, -0.9, inverseViewMatrix);
    vRightDir = norm2(sub2(vRightPoint, vBottomRight));
    f = dot2(vRightDir, viewDirOnMap);
    vTopRight = add2( vBottomRight, mul2scalar(vRightDir, maxFarEdgeDistance/f));
  }

  // If vTopLeft is further than maxFarEdgeDistance away vertically from the lower edge, move it closer.
  if (dot2(viewDirOnMap, sub2(vTopLeft, vBottomLeft)) > maxFarEdgeDistance) {
    vLeftDir = norm2(sub2(vTopLeft, vBottomLeft));
    f = dot2(vLeftDir, viewDirOnMap);
    vTopLeft = add2(vBottomLeft, mul2scalar(vLeftDir, maxFarEdgeDistance/f));
  }

  // Same for vTopRight
  if (dot2(viewDirOnMap, sub2(vTopRight, vBottomRight)) > maxFarEdgeDistance) {
    vRightDir = norm2(sub2(vTopRight, vBottomRight));
    f = dot2(vRightDir, viewDirOnMap);
    vTopRight = add2(vBottomRight, mul2scalar(vRightDir, maxFarEdgeDistance/f));
  }
 
  return [vBottomLeft, vBottomRight, vTopRight, vTopLeft];
}