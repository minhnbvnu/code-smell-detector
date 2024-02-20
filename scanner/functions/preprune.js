function preprune(form, pred, inplace) {
		return prepost(prepruneStep, pred, inplace ? walkInplace : walk, form);
	}