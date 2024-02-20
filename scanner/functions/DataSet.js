function DataSet(data, options) {
    // correctly read optional arguments
    if (data && !Array.isArray(data)) {
      options = data;
      data = null;
    }

    this._options = options || {};
    this._data = {}; // map with data indexed by id
    this.length = 0; // number of items in the DataSet
    this._fieldId = this._options.fieldId || 'id'; // name of the field containing id
    this._type = {}; // internal field types (NOTE: this can differ from this._options.type)

    // all variants of a Date are internally stored as Date, so we can convert
    // from everything to everything (also from ISODate to Number for example)
    if (this._options.type) {
      for (var field in this._options.type) {
        if (this._options.type.hasOwnProperty(field)) {
          var value = this._options.type[field];
          if (value == 'Date' || value == 'ISODate' || value == 'ASPDate') {
            this._type[field] = 'Date';
          } else {
            this._type[field] = value;
          }
        }
      }
    }

    // TODO: deprecated since version 1.1.1 (or 2.0.0?)
    if (this._options.convert) {
      throw new Error('Option "convert" is deprecated. Use "type" instead.');
    }

    this._subscribers = {}; // event subscribers

    // add initial data when provided
    if (data) {
      this.add(data);
    }

    this.setOptions(options);
  }