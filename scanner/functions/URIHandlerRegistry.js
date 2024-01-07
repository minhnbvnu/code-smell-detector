constructor(maxHistoryLength = 50) {
    this.registrations = new Map();
    this.history = [];
    this.maxHistoryLength = maxHistoryLength;
    this._id = 0;

    this.emitter = new Emitter();
  }