function getBoolArrayParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param && param.list && param.list.b) {
	    return param.list.b;
	  }

	  return def;
	}