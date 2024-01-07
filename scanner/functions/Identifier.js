function Identifier(node) {
	  if (node.variance) {
	    if (node.variance === "plus") {
	      this.token("+");
	    } else if (node.variance === "minus") {
	      this.token("-");
	    }
	  }

	  this.word(node.name);
	}