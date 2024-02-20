function ColumnManager(columns, elements) {
	    (0, _classCallCheck3['default'])(this, ColumnManager);
	    this._cached = {};

	    this.columns = columns || this.normalize(elements);
	  }