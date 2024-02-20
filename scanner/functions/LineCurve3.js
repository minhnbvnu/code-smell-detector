function LineCurve3(v1, v2) {

  Curve.call(this);

  this.type = 'LineCurve3';

  this.v1 = v1 || new Vector3();
  this.v2 = v2 || new Vector3();

}