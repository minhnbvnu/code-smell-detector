function sliceImpl(vals, begin, size, shape, dtype) {
	  var isContinous = isSliceContinous(shape, begin, size);
	  var length = sizeFromShape(size);
	  var xStrides = computeStrides(shape);

	  if (isContinous) {
	    var flatOffset = computeFlatOffset(begin, xStrides);

	    if (dtype === 'string') {
	      return vals.slice(flatOffset, flatOffset + length);
	    }

	    return vals.subarray(flatOffset, flatOffset + length);
	  }

	  var decodedData = dtype === 'string' ? fromUint8ToStringArray(vals) : vals;
	  var inBuf = buffer(shape, dtype, decodedData);
	  var outBuf = buffer(size, dtype);

	  for (var i = 0; i < outBuf.size; ++i) {
	    var outLoc = outBuf.indexToLoc(i);
	    var inLoc = outLoc.map(function (idx, j) {
	      return idx + begin[j];
	    });
	    outBuf.set.apply(outBuf, [inBuf.get.apply(inBuf, inLoc)].concat(outLoc));
	  }

	  if (dtype === 'string') {
	    return fromStringArrayToUint8(outBuf.values);
	  }

	  return outBuf.values;
	}