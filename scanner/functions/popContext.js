function popContext() {
	  this.contexts.pop();
	  this.setContext(this.contexts[this.contexts.length - 1]);
	}