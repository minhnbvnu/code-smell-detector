function ClosedSplineCurve3(points) {

  console.warn('THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.');

  CatmullRomCurve3.call(this, points);
  this.type = 'catmullrom';
  this.closed = true;

}