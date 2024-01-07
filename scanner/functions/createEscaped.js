function createEscaped(kind, codePoint, value, fromOffset) {
	      fromOffset = fromOffset || 0;
	      return createValue(kind, codePoint, pos - (value.length + fromOffset), pos);
	    }