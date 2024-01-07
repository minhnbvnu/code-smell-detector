function registerOp(name, opFunc) {
	  var opMapper = {
	    tfOpName: name,
	    category: 'custom',
	    inputs: [],
	    attrs: [],
	    customExecutor: opFunc
	  };
	  CUSTOM_OPS[name] = opMapper;
	}