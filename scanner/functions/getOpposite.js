function getOpposite() {
	  if (this.key === "left") {
	    return this.getSibling("right");
	  } else if (this.key === "right") {
	    return this.getSibling("left");
	  }
	}