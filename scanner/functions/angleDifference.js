function angleDifference(theAngle1, theAngle2) {
  var a1 = (theAngle1 % TWO_PI + TWO_PI) % TWO_PI;
  var a2 = (theAngle2 % TWO_PI + TWO_PI) % TWO_PI;

  if (a2 > a1) {
    var d1 = a2 - a1;
    var d2 = a1 + TWO_PI - a2;
    if (d1 <= d2) {
      return -d1;
    } else {
      return d2;
    }
  } else {
    var d1 = a1 - a2;
    var d2 = a2 + TWO_PI - a1;
    if (d1 <= d2) {
      return d1;
    } else {
      return -d2;
    }
  }
}