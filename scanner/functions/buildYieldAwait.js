function buildYieldAwait(keyword) {
	  return function (node) {
	    this.word(keyword);

	    if (node.delegate) {
	      this.token("*");
	    }

	    if (node.argument) {
	      this.space();
	      var terminatorState = this.startTerminatorless();
	      this.print(node.argument, node);
	      this.endTerminatorless(terminatorState);
	    }
	  };
	}