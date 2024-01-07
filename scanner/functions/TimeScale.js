constructor(props) {
    super(props);

    /** @type {{data: number[], labels: number[], all: number[]}} */
    this._cache = {
      data: [],
      labels: [],
      all: []
    };

    /** @type {Unit} */
    this._unit = 'day';
    /** @type {Unit=} */
    this._majorUnit = undefined;
    this._offsets = {};
    this._normalized = false;
    this._parseOpts = undefined;
  }