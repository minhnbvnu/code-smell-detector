function normalizeSpacings(spaces, length) {
	// XD spacing can be a list or a single value, this method always returns an Array
	// the value "arrays" XD returns aren't actually of type Array:
	if (spaces.map) { return spaces.map((o) => o); }
	if (spaces == null) { spaces = 0; }
	return Array(length).fill(spaces);
}