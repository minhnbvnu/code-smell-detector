function thrown2Error(err) {
	  return new Error("the ".concat(utils.canonicalType(err), " ").concat(stringify(err), " was thrown, throw an Error :)"));
	}