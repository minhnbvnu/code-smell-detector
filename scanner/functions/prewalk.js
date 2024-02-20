function prewalk(form, fn, inplace) {
		return prepost(prewalkStep, fn, inplace ? walkInplace : walk, form);
	}