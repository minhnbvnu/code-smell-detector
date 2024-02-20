function transitionSupport() {
	
	// env.window is not defined yet when this is called
	if (!win) return false;
	
	var b = win.document.body || win.document.documentElement,
		s = b.style,
		p = 'transition',
		v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
	
	if (typeof s[p] == 'string') { return true; }
	
	p = p.charAt(0).toUpperCase() + p.substr(1);
	for (var i=0; i<v.length; i++) {
		if (typeof s[v[i] + p] == 'string') { return true; }
	}
	return false;
}