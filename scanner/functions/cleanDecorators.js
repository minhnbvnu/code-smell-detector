function cleanDecorators(decorators) {
	    return decorators.reverse().map(function (dec) {
	      return dec.expression;
	    });
	  }