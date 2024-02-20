function println(format, varArgs) {
	    var vargs = Array.from(arguments);
	    vargs[0] += '\n';
	    process$4.stdout.write(sprintf.apply(null, vargs));
	  }