function getTextContentLength(node) {
	  var textContent = node.textContent;
	  return textContent === '\n' ? 0 : textContent.length;
	}