function createDisjunction(alternatives, from, to) {
	      return addRaw({
	        type: 'disjunction',
	        body: alternatives,
	        range: [from, to]
	      });
	    }