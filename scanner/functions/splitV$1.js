function splitV$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var numOrSizeSplits = attrs.numOrSizeSplits,
	      axis = attrs.axis;
	  var $axis = parseAxisParam(axis, x.shape)[0];
	  var splitSizes = prepareSplitSize(x, numOrSizeSplits, $axis);
	  var xRank = x.shape.length;
	  var begin = new Array(xRank).fill(0);
	  var size = x.shape.slice();
	  return splitSizes.map(function (s) {
	    var sliceSize = [].concat(size);
	    sliceSize[$axis] = s;
	    var sliceT = slice$4({
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