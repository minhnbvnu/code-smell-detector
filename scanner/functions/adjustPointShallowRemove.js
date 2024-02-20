function adjustPointShallowRemove(point, left, node) {
		if (point.node === node) {
			point.next();
		}
	}