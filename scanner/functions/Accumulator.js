function Accumulator(interval, max) {
  this._interval = interval;
  this._max = max;
  this._total = 0;
  this._lastTime = 0;
  this._startTime = Date.now();
}