function getSpreadLiteral(spread, scope, state) {
	    if (state.opts.loose && !t.isIdentifier(spread.argument, { name: "arguments" })) {
	      return spread.argument;
	    } else {
	      return scope.toArray(spread.argument, true);
	    }
	  }