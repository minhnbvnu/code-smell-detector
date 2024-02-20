function postwalk(form, fn, inplace) {
		return prepost(postwalkStep, fn, inplace ? walkInplace : walk, form);
	}