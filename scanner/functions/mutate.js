function mutate(liveRange, formatter, rootHasImpliedContext) {
		if (liveRange.collapsed) {
			return;
		}
		// Because range may be mutated during traversal, we must only
		// refer to it before traversal.
		var cac = liveRange.commonAncestorContainer;
		var topmostOverrideNode = null;
		var bottommostOverrideNode = null;
		var isNonClearableOverride = false;
		var upperBoundaryAndBeyond = false;
		var fromCacToContext = Dom.childAndParentsUntilIncl(cac, function (node) {
			// Because we shouldn't expect hasContext to handle the
			// document element (which has nodeType 9).
			return !node.parentNode || 9 === node.parentNode.nodeType || formatter.hasContext(node);
		});
		Arrays.forEach(fromCacToContext, function (node) {
			upperBoundaryAndBeyond = upperBoundaryAndBeyond || formatter.isUpperBoundary(node);
			if (null != formatter.getOverride(node)) {
				topmostOverrideNode = node;
				isNonClearableOverride = upperBoundaryAndBeyond;
				bottommostOverrideNode = bottommostOverrideNode || node;
			}
		});
		if ((rootHasImpliedContext || formatter.hasContext(Arrays.last(fromCacToContext)))
			    && !isNonClearableOverride) {
			var pushDownFrom = topmostOverrideNode || cac;
			var cacOverride = formatter.getOverride(bottommostOverrideNode || cac);
			var clearOverrideRec = formatter.clearOverrideRec || function (node) {
				Dom.walkRec(node, formatter.clearOverride);
			};
			pushDownContext(
				liveRange,
				pushDownFrom,
				cacOverride,
				formatter.getOverride,
				formatter.clearOverride,
				clearOverrideRec,
				formatter.pushDownOverride
			);
		} else {
			var setContext = function (node) {
				formatter.setContext(node, isNonClearableOverride);
			};
			walkBoundary(
				liveRange,
				formatter.getOverride,
				formatter.pushDownOverride,
				formatter.clearOverride,
				setContext
			);
		}
	}