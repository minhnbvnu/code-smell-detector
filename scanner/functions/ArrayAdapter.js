function ArrayAdapter ($element, options) {
    this._dataToConvert = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);
  }