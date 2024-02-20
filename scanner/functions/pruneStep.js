function pruneStep(emap, step, node) {
		if (1 === node.nodeType) {
			if (!pruneElem(node, emap)) {
				return [];
			}
			node = Trees.walkDomInplace(node, step);
		}

		// Ephemera.ephemera({ pruneFns: [] })
		node = Arrays.reduce(emap.pruneFns, node, Arrays.applyNotNull);
		if (!node) {
			return [];
		}

		return [node];
	}