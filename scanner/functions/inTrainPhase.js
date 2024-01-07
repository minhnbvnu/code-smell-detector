function inTrainPhase(x, alt, training) {
	  if (training === void 0) {
	    training = false;
	  }

	  return training ? x() : alt();
	}