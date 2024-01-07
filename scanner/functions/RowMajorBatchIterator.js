function RowMajorBatchIterator(upstream, batchSize, enableSmallLastBatch) {
	    var _this8;

	    if (enableSmallLastBatch === void 0) {
	      enableSmallLastBatch = true;
	    }

	    _this8 = _LazyIterator6.call(this) || this;
	    _this8.upstream = upstream;
	    _this8.batchSize = batchSize;
	    _this8.enableSmallLastBatch = enableSmallLastBatch;
	    _this8.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this8;
	  }