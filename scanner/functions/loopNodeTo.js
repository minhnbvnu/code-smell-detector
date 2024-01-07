function loopNodeTo(node) {
	  if (t.isBreakStatement(node)) {
	    return "break";
	  } else if (t.isContinueStatement(node)) {
	    return "continue";
	  }
	}