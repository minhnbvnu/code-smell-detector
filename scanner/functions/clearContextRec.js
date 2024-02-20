function clearContextRec(node) {
			Dom.walkRec(node, clearContext);
		}