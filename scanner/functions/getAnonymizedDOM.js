function getAnonymizedDOM(node, getNodeLabels) {
	  if (!node) {
	    return '[empty]';
	  }

	  var anonymized = anonymizeTextWithin(node, getNodeLabels);
	  if (anonymized.nodeType === Node.TEXT_NODE) {
	    return anonymized.textContent;
	  }

	  !(anonymized instanceof Element) ?  true ? invariant(false, 'Node must be an Element if it is not a text node.') : invariant(false) : void 0;
	  return anonymized.outerHTML;
	}