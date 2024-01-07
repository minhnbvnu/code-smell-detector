function l1(args) {
	  assertObjectArgs(args);
	  return new L1L2({
	    l1: args != null ? args.l1 : null,
	    l2: 0
	  });
	}