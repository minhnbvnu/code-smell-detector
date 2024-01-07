function subTensorToString(vals, shape, dtype, strides, padPerCol, isLast) {
	  if (isLast === void 0) {
	    isLast = true;
	  }

	  var storagePerElement = dtype === 'complex64' ? 2 : 1;
	  var size = shape[0];
	  var rank = shape.length;

	  if (rank === 0) {
	    if (dtype === 'complex64') {
	      var complexTuple = createComplexTuples(vals);
	      return [valToString(complexTuple[0], 0, dtype)];
	    }

	    if (dtype === 'bool') {
	      return [boolNumToString(vals[0])];
	    }

	    return [vals[0].toString()];
	  }

	  if (rank === 1) {
	    if (size > FORMAT_LIMIT_NUM_VALS) {
	      var firstValsSize = FORMAT_NUM_FIRST_LAST_VALS * storagePerElement;
	      var firstVals = Array.from(vals.slice(0, firstValsSize));
	      var lastVals = Array.from(vals.slice((size - FORMAT_NUM_FIRST_LAST_VALS) * storagePerElement, size * storagePerElement));

	      if (dtype === 'complex64') {
	        firstVals = createComplexTuples(firstVals);
	        lastVals = createComplexTuples(lastVals);
	      }

	      return ['[' + firstVals.map(function (x, i) {
	        return valToString(x, padPerCol[i], dtype);
	      }).join(', ') + ', ..., ' + lastVals.map(function (x, i) {
	        return valToString(x, padPerCol[size - FORMAT_NUM_FIRST_LAST_VALS + i], dtype);
	      }).join(', ') + ']'];
	    }

	    var displayVals = dtype === 'complex64' ? createComplexTuples(vals) : Array.from(vals);
	    return ['[' + displayVals.map(function (x, i) {
	      return valToString(x, padPerCol[i], dtype);
	    }).join(', ') + ']'];
	  } // The array is rank 2 or more.


	  var subshape = shape.slice(1);
	  var substrides = strides.slice(1);
	  var stride = strides[0] * storagePerElement;
	  var lines = [];

	  if (size > FORMAT_LIMIT_NUM_VALS) {
	    for (var i = 0; i < FORMAT_NUM_FIRST_LAST_VALS; i++) {
	      var start = i * stride;
	      var end = start + stride;
	      lines.push.apply(lines, subTensorToString(vals.slice(start, end), subshape, dtype, substrides, padPerCol, false
	      /* isLast */
	      ));
	    }

	    lines.push('...');

	    for (var _i = size - FORMAT_NUM_FIRST_LAST_VALS; _i < size; _i++) {
	      var _start = _i * stride;

	      var _end = _start + stride;

	      lines.push.apply(lines, subTensorToString(vals.slice(_start, _end), subshape, dtype, substrides, padPerCol, _i === size - 1
	      /* isLast */
	      ));
	    }
	  } else {
	    for (var _i2 = 0; _i2 < size; _i2++) {
	      var _start2 = _i2 * stride;

	      var _end2 = _start2 + stride;

	      lines.push.apply(lines, subTensorToString(vals.slice(_start2, _end2), subshape, dtype, substrides, padPerCol, _i2 === size - 1
	      /* isLast */
	      ));
	    }
	  }

	  var sep = rank === 2 ? ',' : '';
	  lines[0] = '[' + lines[0] + sep;

	  for (var _i3 = 1; _i3 < lines.length - 1; _i3++) {
	    lines[_i3] = ' ' + lines[_i3] + sep;
	  }

	  var newLineSep = ',\n';

	  for (var _i4 = 2; _i4 < rank; _i4++) {
	    newLineSep += '\n';
	  }

	  lines[lines.length - 1] = ' ' + lines[lines.length - 1] + ']' + (isLast ? '' : newLineSep);
	  return lines;
	}