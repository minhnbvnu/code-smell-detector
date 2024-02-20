function getRemovableWord(text, isBackward) {
	  var matches = isBackward ? BACKSPACE_REGEX.exec(text) : DELETE_REGEX.exec(text);
	  return matches ? matches[0] : text;
	}