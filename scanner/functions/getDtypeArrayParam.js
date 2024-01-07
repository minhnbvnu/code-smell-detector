function getDtypeArrayParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param && param.list && param.list.type) {
	    return param.list.type.map(function (v) {
	      return parseDtypeParam(v);
	    });
	  }

	  return def;
	}