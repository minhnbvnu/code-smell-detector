function Permute(args) {
	    var _this14;

	    _this14 = _Layer7.call(this, args) || this;

	    if (args.dims == null) {
	      throw new Error('Required configuration field `dims` is missing during Permute ' + 'constructor call.');
	    }

	    if (!Array.isArray(args.dims)) {
	      throw new Error('Permute constructor requires `dims` to be an Array, but received ' + (args.dims + " instead."));
	    } // Check the validity of the permutation indices.


	    var expectedSortedIndices = range$1(1, args.dims.length + 1);

	    if (!arraysEqual(args.dims.slice().sort(), expectedSortedIndices)) {
	      throw new Error('Invalid permutation `dims`: ' + JSON.stringify(args.dims) + ' `dims` must contain consecutive integers starting from 1.');
	    }

	    _this14.dims = args.dims;
	    _this14.dimsIncludingBatch = [0].concat(_this14.dims);
	    _this14.inputSpec = [new InputSpec({
	      ndim: _this14.dims.length + 1
	    })];
	    return _this14;
	  }