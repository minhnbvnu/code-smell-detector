function EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {

  Curve.call(this);

  this.type = 'EllipseCurve';

  this.aX = aX || 0;
  this.aY = aY || 0;

  this.xRadius = xRadius || 1;
  this.yRadius = yRadius || 1;

  this.aStartAngle = aStartAngle || 0;
  this.aEndAngle = aEndAngle || 2 * Math.PI;

  this.aClockwise = aClockwise || false;

  this.aRotation = aRotation || 0;

}