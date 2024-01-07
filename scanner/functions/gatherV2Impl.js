function gatherV2Impl(xBuf, indicesBuf, flattenOutputShape) {
	  var outBuf = buffer(flattenOutputShape, xBuf.dtype);

	  for (var i = 0; i < outBuf.size; ++i) {
	    var newLoc = outBuf.indexToLoc(i);
	    var originalLoc = newLoc.slice();
	    var batchIdx = originalLoc[0];
	    var indicesIdx = originalLoc[2];
	    var indicesIndex = indicesBuf.locToIndex([batchIdx, indicesIdx]);
	    originalLoc[2] = indicesBuf.values[indicesIndex];
	    var originalIndex = xBuf.locToIndex(originalLoc);
	    outBuf.values[i] = xBuf.values[originalIndex];
	  }

	  return outBuf;
	}