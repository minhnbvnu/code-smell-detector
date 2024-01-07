function createCharacterClass(classRanges, negative, from, to) {
	      return addRaw({
	        type: 'characterClass',
	        body: classRanges,
	        negative: negative,
	        range: [from, to]
	      });
	    }