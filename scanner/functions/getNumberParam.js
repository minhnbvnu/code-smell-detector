function getNumberParam(attrs, name, def) {
	  var param = attrs[name] || {};
	  var value = param['i'] != null ? param['i'] : param['f'] != null ? param['f'] : def;
	  return typeof value === 'number' ? value : parseInt(value, 10);
	}