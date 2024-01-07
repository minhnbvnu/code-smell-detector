function generateComment(path, parent) {
	    var comment = path.getSource().replace(/\*-\//g, "*-ESCAPED/").replace(/\*\//g, "*-/");
	    if (parent && parent.optional) comment = "?" + comment;
	    if (comment[0] !== ":") comment = ":: " + comment;
	    return comment;
	  }