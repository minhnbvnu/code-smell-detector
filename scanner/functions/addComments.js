function addComments(type, comments) {
	  if (!comments) return;

	  var node = this.node;
	  if (!node) return;

	  var key = type + "Comments";

	  if (node[key]) {
	    node[key] = node[key].concat(comments);
	  } else {
	    node[key] = comments;
	  }
	}