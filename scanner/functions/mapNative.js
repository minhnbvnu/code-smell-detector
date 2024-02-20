function mapNative(a, fn) {
		// Call map directly on the object instead of going through
		// Array.prototype.map. This avoids the problem that we may get
		// passed an array-like object (NodeList) which may cause an
		// error if the implementation of Array.prototype.map can only
		// deal with arrays (Array.prototype.map may be native or
		// provided by a javscript framework).
		return a.map(fn);
	}