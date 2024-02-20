function makeNodeUnformatter(nodeName, leftPoint, rightPoint) {

		function getOverride(node) {
			return nodeName === node.nodeName ? true : null;
		}

		function clearOverride(node) {
			if (nodeName === node.nodeName) {
				removeShallowAdjust(node, leftPoint, rightPoint);
			}
		}

		function pushDownOverride(node, override) {
			if (!override) {
				return;
			}
			ensureWrapper(node, nodeName, getOverride, leftPoint, rightPoint);
		}

		return {
			hasContext: Fn.returnFalse,
			setContext: Fn.noop,
			getOverride: getOverride,
			clearOverride: clearOverride,
			pushDownOverride: pushDownOverride,
			isUpperBoundary: isUpperBoundary_default
		};
	}