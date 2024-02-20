function new_array_n(args) {
	    if (args.length == 1) {
	        return new Array(args[0]);
	    }
	    var sz = args[0];
	    args = args.slice(1);
	    var A = [];
	    for (var i = 0; i < sz; i++) {
	        A.push(new_array_n(args));
	    }
	    return A;
	}