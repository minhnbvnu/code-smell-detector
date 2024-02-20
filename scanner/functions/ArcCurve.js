function ArcCurve(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {

  EllipseCurve.call(this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);

  this.type = 'ArcCurve';

}