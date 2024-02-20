function SplineCurve(points /* array of Vector2 */ ) {

  Curve.call(this);

  this.type = 'SplineCurve';

  this.points = points || [];

}