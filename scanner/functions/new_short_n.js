function new_short_n(args) {
	    if (args.length == 1) {
	        return new_short(args[0]);
	    }
	    var sz = args[0];
	    args = args.slice(1);
	    var A = [];
	    for (var i = 0; i < sz; i++) {
	        A.push(new_short_n(args));
	    }
	    return A;
	}