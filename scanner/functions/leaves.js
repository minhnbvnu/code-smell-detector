function leaves(form, leaf, inplace) {
		var leafWalk = inplace ? walkInplace : walk;

		function leafStep(form) {
			if (isLeaf(form)) {
				return [leaf(form)];
			}
			return identityStep(leafStep, leafWalk, form);
		}
		return leafStep(form)[0];
	}