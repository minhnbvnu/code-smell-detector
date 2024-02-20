function LineCurve(v1, v2) {

  Curve.call(this);

  this.type = 'LineCurve';

  this.v1 = v1 || new Vector2();
  this.v2 = v2 || new Vector2();

}