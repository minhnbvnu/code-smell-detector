function custom_require (e, t, i, r) {
	if (e.length && e[0].startsWith("ace")) {
      window._require_ace(e, t, i, r);
	} else {
      window._require_requirejs(e, t, i, r);
	}
  }