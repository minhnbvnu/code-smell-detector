function getTensorShapeParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param && param.shape) {
	    return parseTensorShapeParam(param.shape);
	  }

	  return def;
	}