function isValidCompletion(record) {
	  var type = record.type;

	  if (type === "normal") {
	    return !hasOwn.call(record, "target");
	  }

	  if (type === "break" || type === "continue") {
	    return !hasOwn.call(record, "value") && t.isLiteral(record.target);
	  }

	  if (type === "return" || type === "throw") {
	    return hasOwn.call(record, "value") && !hasOwn.call(record, "target");
	  }

	  return false;
	}