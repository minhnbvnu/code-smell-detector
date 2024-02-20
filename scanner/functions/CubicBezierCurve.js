function CubicBezierCurve(v0, v1, v2, v3) {

  Curve.call(this);

  this.type = 'CubicBezierCurve';

  this.v0 = v0 || new Vector2();
  this.v1 = v1 || new Vector2();
  this.v2 = v2 || new Vector2();
  this.v3 = v3 || new Vector2();

}