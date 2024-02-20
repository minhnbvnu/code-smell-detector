function pushDownContext(liveRange, pushDownFrom, cacOverride, getOverride, clearOverride, clearOverrideRec, pushDownOverride) {
		// Because range may be mutated during traversal, we must only
		// refer to it before traversal.
		var cac = liveRange.commonAncestorContainer;
		walkBoundary(liveRange, getOverride, pushDownOverride, clearOverride, clearOverrideRec, cacOverride);
		var fromCacToTop = Dom.childAndParentsUntilInclNode(cac, pushDownFrom);
		ascendWalkSiblings(fromCacToTop, false, getOverride, pushDownOverride, clearOverride, pushDownOverride, null);
		clearOverride(pushDownFrom);
	}