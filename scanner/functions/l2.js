function l2(args) {
	  assertObjectArgs(args);
	  return new L1L2({
	    l2: args != null ? args.l2 : null,
	    l1: 0
	  });
	}