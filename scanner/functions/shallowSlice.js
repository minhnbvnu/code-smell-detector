function shallowSlice(x, begin, size, backend) {
	  var xTexData = backend.texData.get(x.dataId);
	  var t = backend.makeTensorInfo(size, x.dtype);
	  var newTexData = backend.texData.get(t.dataId); // Copy texture data from the original tensor.

	  Object.assign(newTexData, xTexData);
	  newTexData.shape = size;
	  newTexData.dtype = x.dtype;
	  var flatOffset = computeFlatOffset(begin, computeStrides(x.shape));

	  if (xTexData.slice) {
	    // We are slicing an already sliced tensor, so we have to accumulate
	    // the offset.
	    flatOffset += xTexData.slice.flatOffset;
	  }

	  newTexData.slice = {
	    flatOffset: flatOffset,
	    // Point to the original dataId, which is used to do ref counting.
	    origDataId: xTexData.slice && xTexData.slice.origDataId || x.dataId
	  }; // Increase the ref count for that data bucket.

	  var refCount = backend.dataRefCount.get(newTexData.slice.origDataId) || 1;
	  backend.dataRefCount.set(newTexData.slice.origDataId, refCount + 1);
	  return t;
	}