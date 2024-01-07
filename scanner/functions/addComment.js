function addComment(type, content, line) {
	  this.addComments(type, [{
	    type: line ? "CommentLine" : "CommentBlock",
	    value: content
	  }]);
	}