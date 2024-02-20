function new_float_n(args) {
	    if (args.length == 1) {
	        return new_float(args[0]);
	    }
	    var sz = args[0];
	    args = args.slice(1);
	    var A = [];
	    for (var i = 0; i < sz; i++) {
	        A.push(new_float_n(args));
	    }
	    return A;
	}