function getVecChannels(name, rank) {
	  return ['x', 'y', 'z', 'w', 'u', 'v'].slice(0, rank).map(function (d) {
	    return name + "." + d;
	  });
	}