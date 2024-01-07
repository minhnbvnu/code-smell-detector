function createReference(matchIndex) {
	      return addRaw({
	        type: 'reference',
	        matchIndex: parseInt(matchIndex, 10),
	        range: [pos - 1 - matchIndex.length, pos]
	      });
	    }