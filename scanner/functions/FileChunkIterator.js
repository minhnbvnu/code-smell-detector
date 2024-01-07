function FileChunkIterator(file, options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _ByteChunkIterator.call(this) || this;
	    _this.file = file;
	    _this.options = options;
	    assert(file instanceof Uint8Array || (env().get('IS_BROWSER') ? file instanceof File || file instanceof Blob : false), function () {
	      return 'FileChunkIterator only supports File, Blob and Uint8Array ' + 'right now.';
	    });
	    _this.offset = options.offset || 0; // default 1MB chunk has tolerable perf on large files

	    _this.chunkSize = options.chunkSize || 1024 * 1024;
	    return _this;
	  }