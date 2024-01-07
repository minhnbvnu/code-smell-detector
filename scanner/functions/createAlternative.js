function createAlternative(terms, from, to) {
	      return addRaw({
	        type: 'alternative',
	        body: terms,
	        range: [from, to]
	      });
	    }