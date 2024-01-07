function getBoolParam(attrs, name, def) {
	  var param = attrs[name];
	  return param ? param.b : def;
	}