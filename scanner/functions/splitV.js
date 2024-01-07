function splitV(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var numOrSizeSplits = attrs.numOrSizeSplits,
	      axis = attrs.axis;
	  var $axis = parseAxisParam(axis, x.shape)[0];
	  var splitSizes = prepareSplitSize(x, numOrSizeSplits, $axis);
	  var begin = new Array(x.shape.length).fill(0);
	  var size = x.shape.slice();
	  return splitSizes.map(function (s) {
	    var sliceSize = [].concat(size);
	    sliceSize[$axis] = s;
	    var sliceT = slice$3({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        begin: begin,
	        size: sliceSize
	      }
	    });
	    begin[$axis] += s;
	    return sliceT;
	  });
	}