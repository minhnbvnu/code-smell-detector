function restack(node, hasContext, ignoreHorizontal, ignoreVertical, leftPoint, rightPoint) {
		var notIgnoreHorizontal = function (node) {
			return hasContext(node) || !ignoreHorizontal(node);
		};
		var notIgnoreVertical = Fn.complement(ignoreVertical);
		if (hasContext(node)) {
			return true;
		}
		var context = restackRec(node, hasContext, notIgnoreHorizontal, notIgnoreVertical);
		if (!context) {
			return false;
		}
		wrapAdjust(node, context, leftPoint, rightPoint);
		return true;
	}