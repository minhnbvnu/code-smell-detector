function createCharacterClassEscape(value) {
	      return addRaw({
	        type: 'characterClassEscape',
	        value: value,
	        range: [pos - 2, pos]
	      });
	    }