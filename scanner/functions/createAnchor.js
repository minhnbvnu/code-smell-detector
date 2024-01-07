function createAnchor(kind, rawLength) {
	      return addRaw({
	        type: 'anchor',
	        kind: kind,
	        range: [pos - rawLength, pos]
	      });
	    }