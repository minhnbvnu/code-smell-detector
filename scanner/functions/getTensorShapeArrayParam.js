function getTensorShapeArrayParam(attrs, name, def) {
	  var param = attrs[name];

	  if (param && param.list && param.list.shape) {
	    return param.list.shape.map(function (v) {
	      return parseTensorShapeParam(v);
	    });
	  }

	  return def;
	}