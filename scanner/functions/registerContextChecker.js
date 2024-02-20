function registerContextChecker(checkId) {
	    var check = this.contextChecks[(checkId + "Check")];
	    return this.tokenizer.registerContextChecker(
	        checkId, check.startCheck, check.endCheck
	    );
	}