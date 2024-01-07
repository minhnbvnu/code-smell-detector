function getA(channels) {
	    channels[rank - 1] = '(' + channels[rank - 1] + " + 1)";
	    channels[rank - 2] = '(' + channels[rank - 2] + " + 1)";
	    return getChannel(channels);
	  }