function nearestPointInPlane (positionOnPlane, planeNormal, pointToTest, resultPoint) {
   var t = distanceOfPointFromPlane(positionOnPlane, planeNormal, pointToTest);
  // closest point on the plane
   resultPoint.copy(planeNormal);
   resultPoint.multiplyScalar(t);
   resultPoint.add(pointToTest);
   return resultPoint;
 }