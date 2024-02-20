function ELSE(state) {
	    // This instruction has been reached by executing a then branch
	    // so it just skips ahead until matching EIF.
	    //
	    // In case the IF was negative the IF[] instruction already
	    // skipped forward over the ELSE[]

	    if (exports.DEBUG) { console.log(state.step, 'ELSE[]'); }

	    skip(state, false);
	}