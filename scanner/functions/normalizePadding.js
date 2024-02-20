function normalizePadding(pad) {
	// XD padding can be a rect object or a single value
	// returns null if no padding, otherwise returns a rect object
	if (!pad) { return null; }
	if (isNaN(pad)) { return pad; } // already a rect
	return {top: pad, right: pad, bottom: pad, left: pad, homogenous: true}
}