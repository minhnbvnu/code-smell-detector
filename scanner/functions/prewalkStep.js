function prewalkStep(step, fn, walk, form) {
		return [walk(fn(form), step)];
	}