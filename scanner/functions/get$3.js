function get$3(identifierOrFn) {
	  if (typeof identifierOrFn === 'string') {
	    if (identifierOrFn in lossesMap) {
	      return lossesMap[identifierOrFn];
	    }

	    var errMsg = "Unknown loss " + identifierOrFn;

	    if (identifierOrFn.toLowerCase().includes('softmaxcrossentropy')) {
	      errMsg = "Unknown loss " + identifierOrFn + ". " + 'Use "categoricalCrossentropy" as the string name for ' + 'tf.losses.softmaxCrossEntropy';
	    }

	    throw new ValueError(errMsg);
	  } else {
	    return identifierOrFn;
	  }
	}