function _variance(node) {
	  if (node.variance === "plus") {
	    this.token("+");
	  } else if (node.variance === "minus") {
	    this.token("-");
	  }
	}