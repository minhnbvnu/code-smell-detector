function getCompletionRecords() {
	  var paths = [];

	  var add = function add(path) {
	    if (path) paths = paths.concat(path.getCompletionRecords());
	  };

	  if (this.isIfStatement()) {
	    add(this.get("consequent"));
	    add(this.get("alternate"));
	  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
	    add(this.get("body"));
	  } else if (this.isProgram() || this.isBlockStatement()) {
	    add(this.get("body").pop());
	  } else if (this.isFunction()) {
	    return this.get("body").getCompletionRecords();
	  } else if (this.isTryStatement()) {
	    add(this.get("block"));
	    add(this.get("handler"));
	    add(this.get("finalizer"));
	  } else {
	    paths.push(this);
	  }

	  return paths;
	}