function getFuncParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param && param.func) {
	    return param.func.name;
	  }

	  return def;
	}