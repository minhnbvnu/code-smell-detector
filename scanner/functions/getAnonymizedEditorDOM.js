function getAnonymizedEditorDOM(node, getNodeLabels) {
	  // grabbing the DOM content of the Draft editor
	  var currentNode = node;
	  while (currentNode) {
	    if (currentNode instanceof Element && currentNode.hasAttribute('contenteditable')) {
	      // found the Draft editor container
	      return getAnonymizedDOM(currentNode, getNodeLabels);
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return 'Could not find contentEditable parent of node';
	}