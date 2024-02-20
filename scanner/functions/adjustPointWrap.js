function adjustPointWrap(point, left, node, wrapper) {
		// Because we prefer the range to be outside the wrapper (no
		// particular reason though).
		if (point.node === node && !point.atEnd) {
			point.node = wrapper;
		}
	}