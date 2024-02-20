function prepost(step, fnOrPred, walk, form) {
		function prepostStep(form) {
			return step(prepostStep, fnOrPred, walk, form);
		}
		return prepostStep(form)[0];
	}