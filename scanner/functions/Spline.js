function Spline(points) {

  console.warn('THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.');

  CatmullRomCurve3.call(this, points);
  this.type = 'catmullrom';

}