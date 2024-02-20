function CubicBezierCurve3(v0, v1, v2, v3) {

  Curve.call(this);

  this.type = 'CubicBezierCurve3';

  this.v0 = v0 || new Vector3();
  this.v1 = v1 || new Vector3();
  this.v2 = v2 || new Vector3();
  this.v3 = v3 || new Vector3();

}