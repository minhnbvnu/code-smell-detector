function parseTupleParam(param) {
	  if (typeof param === 'number') {
	    return [param, param, param];
	  }

	  if (param.length === 2) {
	    return [param[0], param[1], 1];
	  }

	  return param;
	}