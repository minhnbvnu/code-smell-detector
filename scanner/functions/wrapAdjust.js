function wrapAdjust(node, wrapper, leftPoint, rightPoint) {
		if (wrapper.parentNode) {
			removeShallowAdjust(wrapper, leftPoint, rightPoint);
		}
		adjustPointWrap(leftPoint, true, node, wrapper);
		adjustPointWrap(rightPoint, false, node, wrapper);
		Dom.wrap(node, wrapper);
	}