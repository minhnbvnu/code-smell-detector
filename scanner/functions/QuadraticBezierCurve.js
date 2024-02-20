function QuadraticBezierCurve(v0, v1, v2) {

  Curve.call(this);

  this.type = 'QuadraticBezierCurve';

  this.v0 = v0 || new Vector2();
  this.v1 = v1 || new Vector2();
  this.v2 = v2 || new Vector2();

}