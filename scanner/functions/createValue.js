function createValue(kind, codePoint, from, to) {
	      return addRaw({
	        type: 'value',
	        kind: kind,
	        codePoint: codePoint,
	        range: [from, to]
	      });
	    }