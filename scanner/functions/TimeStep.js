function TimeStep(start, end, minimumStep, hiddenDates) {
    this.moment = moment;

    // variables
    this.current = this.moment();
    this._start = this.moment();
    this._end = this.moment();

    this.autoScale = true;
    this.scale = 'day';
    this.step = 1;

    // initialize the range
    this.setRange(start, end, minimumStep);

    // hidden Dates options
    this.switchedDay = false;
    this.switchedMonth = false;
    this.switchedYear = false;
    this.hiddenDates = hiddenDates;
    if (hiddenDates === undefined) {
      this.hiddenDates = [];
    }

    this.format = TimeStep.FORMAT; // default formatting
  }