function getSource() {
	  var node = this.node;
	  if (node.end) {
	    return this.hub.file.code.slice(node.start, node.end);
	  } else {
	    return "";
	  }
	}