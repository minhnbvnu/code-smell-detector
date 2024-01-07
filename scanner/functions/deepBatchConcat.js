function deepBatchConcat(rows) {
	  if (rows === null) {
	    return null;
	  } // use the first item to decide whether to recurse or batch here.


	  var exampleRow = rows[0];

	  if (canTensorify(exampleRow)) {
	    // rows is an array of primitives, Tensors, or arrays.  Batch them.
	    var value = batchConcat(rows);
	    return {
	      value: value,
	      recurse: false
	    };
	  } // the example row is an object, so recurse into it.


	  return {
	    value: null,
	    recurse: true
	  };
	}