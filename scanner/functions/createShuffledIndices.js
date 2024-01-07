function createShuffledIndices(n) {
	  var shuffledIndices = new Uint32Array(n);

	  for (var i = 0; i < n; ++i) {
	    shuffledIndices[i] = i;
	  }

	  shuffle(shuffledIndices);
	  return shuffledIndices;
	}