function postprune(form, pred, inplace) {
		return prepost(postpruneStep, pred, inplace ? walkInplace : walk, form);
	}