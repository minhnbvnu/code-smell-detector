function unnormalizeAxis(ellipsisInsertionIndex, numElidedAxes, normalizedAxis) {
	  if (normalizedAxis <= ellipsisInsertionIndex) {
	    return normalizedAxis;
	  }

	  return normalizedAxis - (numElidedAxes - 1);
	}