function CustomTime(body, options) {
    this.body = body;

    // default options
    this.defaultOptions = {
      moment: moment,
      locales: locales,
      locale: 'en',
      id: undefined
    };
    this.options = util.extend({}, this.defaultOptions);

    if (options && options.time) {
      this.customTime = options.time;
    } else {
      this.customTime = new Date();
    }

    this.eventParams = {}; // stores state parameters while dragging the bar

    this.setOptions(options);

    // create the DOM
    this._create();
  }