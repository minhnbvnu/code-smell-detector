function getNodeLength(node) {
	  // http://www.w3.org/TR/dom/#concept-node-length
	  switch (node.nodeType) {
	    case Node.DOCUMENT_TYPE_NODE:
	      return 0;
	    case Node.TEXT_NODE:
	    case Node.PROCESSING_INSTRUCTION_NODE:
	    case Node.COMMENT_NODE:
	      return node.length;
	    default:
	      return node.childNodes.length;
	  }
	}