function createClassRange(min, max, from, to) {
	      // See 15.10.2.15:
	      if (min.codePoint > max.codePoint) {
	        bail('invalid range in character class', min.raw + '-' + max.raw, from, to);
	      }

	      return addRaw({
	        type: 'characterClassRange',
	        min: min,
	        max: max,
	        range: [from, to]
	      });
	    }