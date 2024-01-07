function toIdentifier(name) {
	  name = name + "";

	  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

	  name = name.replace(/^[-0-9]+/, "");

	  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
	    return c ? c.toUpperCase() : "";
	  });

	  if (!t.isValidIdentifier(name)) {
	    name = "_" + name;
	  }

	  return name || "_";
	}