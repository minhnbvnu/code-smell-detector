function CubicInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {

  Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);

  this._weightPrev = -0;
  this._offsetPrev = -0;
  this._weightNext = -0;
  this._offsetNext = -0;

}