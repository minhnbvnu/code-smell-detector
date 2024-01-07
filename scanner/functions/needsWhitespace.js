function needsWhitespace(node, parent, type) {
	  if (!node) return 0;

	  if (t.isExpressionStatement(node)) {
	    node = node.expression;
	  }

	  var linesInfo = find(expandedWhitespaceNodes, node, parent);

	  if (!linesInfo) {
	    var items = find(expandedWhitespaceList, node, parent);
	    if (items) {
	      for (var i = 0; i < items.length; i++) {
	        linesInfo = needsWhitespace(items[i], node, type);
	        if (linesInfo) break;
	      }
	    }
	  }

	  return linesInfo && linesInfo[type] || 0;
	}