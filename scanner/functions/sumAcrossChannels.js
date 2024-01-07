function sumAcrossChannels(offset) {
	    var currentChannel = offset % channels;
	    var beginSumOffset = offset - currentChannel + Math.max(0, currentChannel - depthRadius);
	    var endSumOffset = offset - currentChannel + Math.min(currentChannel + depthRadius, maxD);
	    var sum = 0.0;

	    for (; beginSumOffset <= endSumOffset; beginSumOffset++) {
	      var z = xValues[beginSumOffset];
	      sum += z * z;
	    }

	    return sum;
	  }