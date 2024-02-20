function cloneStep(form) {
			return identityStep(cloneStep, walk, form);
		}