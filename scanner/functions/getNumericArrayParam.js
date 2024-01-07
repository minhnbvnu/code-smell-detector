function getNumericArrayParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param) {
	    return ((param.list.f && param.list.f.length ? param.list.f : param.list.i) || []).map(function (v) {
	      return typeof v === 'number' ? v : parseInt(v, 10);
	    });
	  }

	  return def;
	}