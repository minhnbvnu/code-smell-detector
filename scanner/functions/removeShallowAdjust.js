function removeShallowAdjust(node, leftPoint, rightPoint) {
		adjustPointShallowRemove(leftPoint, true, node);
		adjustPointShallowRemove(rightPoint, false, node);
		Dom.removeShallow(node);
	}