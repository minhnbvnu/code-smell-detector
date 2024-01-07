function OperationMapper() {
	    var _ref;

	    var ops = [arithmetic, basicMath, control, convolution, creation, dynamic, evaluation, logical, image$1, graph, matrices, normalization, reduction, sliceJoin, spectral$1, transformation, hashTable];

	    var mappersJson = (_ref = []).concat.apply(_ref, ops.map(function (op) {
	      return op.json;
	    }));

	    this.opMappers = mappersJson.reduce(function (map, mapper) {
	      map[mapper.tfOpName] = mapper;
	      return map;
	    }, {});
	  }