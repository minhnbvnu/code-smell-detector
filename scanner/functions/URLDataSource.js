function URLDataSource(url, fileOptions) {
	    var _this;

	    if (fileOptions === void 0) {
	      fileOptions = {};
	    }

	    _this = _DataSource.call(this) || this;
	    _this.url = url;
	    _this.fileOptions = fileOptions;
	    return _this;
	  }