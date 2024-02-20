function new_int_n(args) {
	    if (args.length == 1) {
	        return new_int(args[0]);
	    }
	    var sz = args[0];
	    args = args.slice(1);
	    var A = [];
	    for (var i = 0; i < sz; i++) {
	        A.push(new_int_n(args));
	    }
	    return A;
	}