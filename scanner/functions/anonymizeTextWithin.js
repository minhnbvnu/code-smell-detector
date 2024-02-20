function anonymizeTextWithin(node, getNodeLabels) {
	  var labels = getNodeLabels !== undefined ? getNodeLabels(node) : [];

	  if (node.nodeType === Node.TEXT_NODE) {
	    var length = node.textContent.length;
	    return document.createTextNode('[text ' + length + (labels.length ? ' | ' + labels.join(', ') : '') + ']');
	  }

	  var clone = node.cloneNode();
	  if (clone.nodeType === 1 && labels.length) {
	    clone.setAttribute('data-labels', labels.join(', '));
	  }
	  var childNodes = node.childNodes;
	  for (var ii = 0; ii < childNodes.length; ii++) {
	    clone.appendChild(anonymizeTextWithin(childNodes[ii], getNodeLabels));
	  }

	  return clone;
	}