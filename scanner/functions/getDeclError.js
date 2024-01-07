function getDeclError(node) {
	  return new Error("all declarations should have been transformed into " + "assignments before the Exploder began its work: " + (0, _stringify2.default)(node));
	}