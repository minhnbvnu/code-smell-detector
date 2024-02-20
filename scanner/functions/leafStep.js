function leafStep(form) {
			if (isLeaf(form)) {
				return [leaf(form)];
			}
			return identityStep(leafStep, leafWalk, form);
		}