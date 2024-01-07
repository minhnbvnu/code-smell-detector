function tensorToString(vals, shape, dtype, verbose) {
	  var strides = computeStrides(shape);
	  var padPerCol = computeMaxSizePerColumn(vals, shape, dtype, strides);
	  var rank = shape.length;
	  var valsLines = subTensorToString(vals, shape, dtype, strides, padPerCol);
	  var lines = ['Tensor'];

	  if (verbose) {
	    lines.push("  dtype: " + dtype);
	    lines.push("  rank: " + rank);
	    lines.push("  shape: [" + shape + "]");
	    lines.push("  values:");
	  }

	  lines.push(valsLines.map(function (l) {
	    return '    ' + l;
	  }).join('\n'));
	  return lines.join('\n');
	}