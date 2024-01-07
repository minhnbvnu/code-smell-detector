function getDtypeParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param && param.type) {
	    return parseDtypeParam(param.type);
	  }

	  return def;
	}