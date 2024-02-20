function CatmullRomCurve3(points, closed, curveType, tension) {

  Curve.call(this);

  this.type = 'CatmullRomCurve3';

  this.points = points || [];
  this.closed = closed || false;
  this.curveType = curveType || 'centripetal';
  this.tension = tension || 0.5;

}