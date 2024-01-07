function createQuantifier(min, max, from, to) {
	      if (to == null) {
	        from = pos - 1;
	        to = pos;
	      }

	      return addRaw({
	        type: 'quantifier',
	        min: min,
	        max: max,
	        greedy: true,
	        body: null, // set later on
	        range: [from, to]
	      });
	    }