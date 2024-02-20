function CurvePath() {

  Curve.call(this);

  this.type = 'CurvePath';

  this.curves = [];
  this.autoClose = false; // Automatically closes the path

}