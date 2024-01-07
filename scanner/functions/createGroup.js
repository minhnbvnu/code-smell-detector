function createGroup(behavior, disjunction, from, to) {
	      return addRaw({
	        type: 'group',
	        behavior: behavior,
	        body: disjunction,
	        range: [from, to]
	      });
	    }