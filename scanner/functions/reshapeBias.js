function reshapeBias(xRank, bias, dataFormat) {
	  var biasShape = bias.shape;

	  if (bias.rank !== 1 && bias.rank !== xRank) {
	    throw new ValueError("Unexpected bias dimensions: " + bias.rank + ("; expected it to be 1 or " + xRank));
	  }

	  if (xRank === 5) {
	    if (dataFormat === 'channelsFirst') {
	      if (biasShape.length === 1) {
	        return bias.reshape([1, biasShape[0], 1, 1, 1]);
	      } else {
	        return bias.reshape([1, biasShape[3], biasShape[0], biasShape[1], biasShape[2]]);
	      }
	    } else if (dataFormat === 'channelsLast') {
	      if (biasShape.length === 1) {
	        return bias.reshape([1, 1, 1, 1, biasShape[0]]);
	      } else {
	        return bias.reshape([1].concat(biasShape));
	      }
	    }
	  } else if (xRank === 4) {
	    if (dataFormat === 'channelsFirst') {
	      if (biasShape.length === 1) {
	        return bias.reshape([1, biasShape[0], 1, 1]);
	      } else {
	        return bias.reshape([1, biasShape[2], biasShape[0], biasShape[1]]);
	      }
	    } else if (dataFormat === 'channelsLast') {
	      if (biasShape.length === 1) {
	        return bias.reshape([1, 1, 1, biasShape[0]]);
	      } else {
	        return bias.reshape([1].concat(biasShape));
	      }
	    }
	  } else if (xRank === 3) {
	    if (dataFormat === 'channelsFirst') {
	      if (biasShape.length === 1) {
	        return bias.reshape([1, biasShape[0], 1]);
	      } else {
	        return bias.reshape([1, biasShape[1], biasShape[0]]);
	      }
	    } else if (dataFormat === 'channelsLast') {
	      if (biasShape.length === 1) {
	        return bias.reshape([1, 1, biasShape[0]]);
	      } else {
	        return bias.reshape([1].concat(biasShape));
	      }
	    }
	  } else if (xRank < 3) {
	    return bias;
	  }

	  throw new ValueError("Unsupported input rank by biasAdd: " + bias.rank);
	}