function prepruneStep(step, fn, walk, form) {
		return fn(form) ? [] : [walk(form, step)];
	}