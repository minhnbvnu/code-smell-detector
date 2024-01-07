function getMatrixSizeFromUnpackedArraySize(unpackedSize, channelsPerTexture) {
	  if (unpackedSize % channelsPerTexture !== 0) {
	    throw new Error("unpackedSize (" + unpackedSize + ") must be a multiple of " + ("" + channelsPerTexture));
	  }

	  return unpackedSize / channelsPerTexture;
	}