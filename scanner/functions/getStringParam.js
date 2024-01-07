function getStringParam(attrs, name, def, keepCase) {
	  if (keepCase === void 0) {
	    keepCase = false;
	  }

	  var param = attrs[name];

	  if (param != null) {
	    return parseStringParam(param.s, keepCase);
	  }

	  return def;
	}