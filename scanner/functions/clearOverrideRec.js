function clearOverrideRec(node) {
			Dom.walkRec(node, clearOverride);
		}