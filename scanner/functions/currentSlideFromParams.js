function currentSlideFromParams() {
	var result;
	// Match numeric slide hashes: #241
	if (result = window.location.hash.match(/^#([0-9]+)$/)) {
		return result[1] - 1;
	}
	// Match slide, with optional internal mark: #slideName(+internal)
	else if (result = window.location.hash.match(/^#([^+]+)\+?(.*)?$/)) {
	  return currentSlideFromName(result[1]);
  }
}