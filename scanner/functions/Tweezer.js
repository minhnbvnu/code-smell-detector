function Tweezer() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tweezer);

    this.duration = opts.duration || 1000;
    this.ease = opts.easing || this._defaultEase;
    this.start = opts.start;
    this.end = opts.end;

    this.frame = null;
    this.next = null;
    this.isRunning = false;
    this.events = {};
    this.direction = this.start < this.end ? 'up' : 'down';
  }