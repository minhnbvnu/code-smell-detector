function getPermuted(reshapedRank, blockShapeRank, batchToSpace) {
	  if (batchToSpace === void 0) {
	    batchToSpace = true;
	  }

	  var permuted = [];

	  if (batchToSpace) {
	    permuted.push(blockShapeRank);

	    for (var i = blockShapeRank + 1; i < reshapedRank; ++i) {
	      if (i <= 2 * blockShapeRank) {
	        permuted.push(i);
	        permuted.push(i - (blockShapeRank + 1));
	      } else {
	        permuted.push(i);
	      }
	    }
	  } else {
	    var permutedBeforeBatch = [];
	    var permutedAfterBatch = [];

	    for (var _i = 1; _i < reshapedRank; ++_i) {
	      if (_i >= blockShapeRank * 2 + 1 || _i % 2 === 1) {
	        permutedAfterBatch.push(_i);
	      } else {
	        permutedBeforeBatch.push(_i);
	      }
	    }

	    permuted.push.apply(permuted, permutedBeforeBatch);
	    permuted.push(0);
	    permuted.push.apply(permuted, permutedAfterBatch);
	  }

	  return permuted;
	}