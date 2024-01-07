function makeTrace(fileNameIdentifier, lineNumber) {
	    var fileLineLiteral = lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
	    var fileNameProperty = t.objectProperty(t.identifier("fileName"), fileNameIdentifier);
	    var lineNumberProperty = t.objectProperty(t.identifier("lineNumber"), fileLineLiteral);
	    return t.objectExpression([fileNameProperty, lineNumberProperty]);
	  }