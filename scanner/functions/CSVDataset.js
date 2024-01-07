function CSVDataset(input, csvConfig) {
	    var _this;

	    _this = _Dataset.call(this) || this;
	    _this.input = input;
	    _this.hasHeader = true;
	    _this.fullColumnNames = null;
	    _this.columnNamesValidated = false;
	    _this.columnConfigs = null;
	    _this.configuredColumnsOnly = false;
	    _this.delimiter = ',';
	    _this.delimWhitespace = false;
	    _this.base = new TextLineDataset(input);

	    if (!csvConfig) {
	      csvConfig = {};
	    }

	    _this.hasHeader = csvConfig.hasHeader === false ? false : true;
	    _this.fullColumnNames = csvConfig.columnNames;
	    _this.columnConfigs = csvConfig.columnConfigs;
	    _this.configuredColumnsOnly = csvConfig.configuredColumnsOnly;

	    if (csvConfig.delimWhitespace) {
	      assert(csvConfig.delimiter == null, function () {
	        return 'Delimiter should not be provided when delimWhitespace is true.';
	      });
	      _this.delimWhitespace = true;
	      _this.delimiter = ' ';
	    } else {
	      _this.delimiter = csvConfig.delimiter ? csvConfig.delimiter : ',';
	    }

	    return _this;
	  }