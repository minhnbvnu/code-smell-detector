function distanceOfPointFromPlane (positionOnPlane, planeNormal, pointToTest) {
  // the d value in the plane equation a*x + b*y + c*z=d
   var d = planeNormal.dot(positionOnPlane);

  // distance of point from plane
   return (d - planeNormal.dot(pointToTest)) / planeNormal.length();
 }