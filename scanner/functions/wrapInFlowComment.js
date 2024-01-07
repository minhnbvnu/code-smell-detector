function wrapInFlowComment(path, parent) {
	    path.addComment("trailing", generateComment(path, parent));
	    path.replaceWith(t.noop());
	  }