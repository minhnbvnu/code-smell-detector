function Queue(daq, name, options) {
      this.daq = daq;
      this.name = name;
      this.options = options;
      this._queue = [];
    }