function getAlignment(x, y) {
	// XD uses 0 to 1, Flutter uses -1 to +1.
	return `Alignment(${$.fix(x*2-1, 3)}, ${$.fix(y*2-1, 3)})`;
}