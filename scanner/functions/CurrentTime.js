function CurrentTime(body, options) {
    this.body = body;

    // default options
    this.defaultOptions = {
      showCurrentTime: true,

      moment: moment,
      locales: locales,
      locale: 'en'
    };
    this.options = util.extend({}, this.defaultOptions);
    this.offset = 0;

    this._create();

    this.setOptions(options);
  }