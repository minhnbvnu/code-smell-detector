function getStringArrayParam(attrs, name, def, keepCase) {
	  if (keepCase === void 0) {
	    keepCase = false;
	  }

	  var param = attrs[name];

	  if (param && param.list && param.list.s) {
	    return param.list.s.map(function (v) {
	      return parseStringParam(v, keepCase);
	    });
	  }

	  return def;
	}