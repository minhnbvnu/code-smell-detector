function errorLocal2Remote(e) {
	    return {
	        type: SpecialArgType.ERROR,
	        name: e.name,
	        message: e.message,
	        stack: e.stack
	    };
	}