function labels(expected) {
		equal(v.errors().filter(":visible").size(), expected);
	}