function custom_define (e, t, i) {
	if (e.startsWith != null && e.startsWith("ace")) {
      window._define_ace(e, t, i);
	} else {
      window._define_requirejs(e, t, i);
	}
  }