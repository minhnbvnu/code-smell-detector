function unsortedSegmentSum_(x, segmentIds, numSegments) {
	  var $x = convertToTensor(x, 'x', 'unsortedSegmentSum');
	  var $segmentIds = convertToTensor(segmentIds, 'segmentIds', 'unsortedSegmentSum', 'int32');
	  assert(isInt(numSegments), function () {
	    return 'numSegments must be of dtype int';
	  });
	  var inputs = {
	    x: $x,
	    segmentIds: $segmentIds
	  };
	  var attrs = {
	    numSegments: numSegments
	  };
	  return ENGINE.runKernel(UnsortedSegmentSum, inputs, attrs);
	}