function parseNodeName(name) {
	  var parts = name.split(':');

	  if (parts.length === 1) {
	    return [name, 0];
	  }

	  var nodeName = parts[0];
	  return [nodeName, Number(parts[parts.length - 1])];
	}