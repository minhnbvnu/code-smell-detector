function exportContent(contentState) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  return new MentionGenerator(contentState, options).generate();
	}