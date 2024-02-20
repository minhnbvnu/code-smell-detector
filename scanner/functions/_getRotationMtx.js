function _getRotationMtx(r) {
	return {
		a: Math.cos(r), b: Math.sin(r), e: 0,
		c:-Math.sin(r), d: Math.cos(r), f: 0,
	}
}