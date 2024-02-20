function StepNumber(start, end, step, prettyStep) {
    // set default values
    this._start = 0;
    this._end = 0;
    this._step = 1;
    this.prettyStep = true;
    this.precision = 5;

    this._current = 0;
    this.setRange(start, end, step, prettyStep);
  }