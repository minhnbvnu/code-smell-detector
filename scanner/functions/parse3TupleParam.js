function parse3TupleParam(param) {
	  return typeof param === 'number' ? [param, param, param] : param;
	}