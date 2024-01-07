function stridedSliceImpl(outShape, xBuf, strides, begin) {
	  var outBuf = buffer(outShape, xBuf.dtype);

	  for (var i = 0; i < outBuf.size; i++) {
	    var loc = outBuf.indexToLoc(i);
	    var newLoc = new Array(loc.length);

	    for (var j = 0; j < newLoc.length; j++) {
	      newLoc[j] = loc[j] * strides[j] + begin[j];
	    }

	    outBuf.set.apply(outBuf, [xBuf.get.apply(xBuf, newLoc)].concat(loc));
	  }

	  return outBuf;
	}