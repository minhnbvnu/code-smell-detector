function prepruneDom(form, pred, inplace) {
		return prepost(prepruneStep, pred, walkDomInplace, inplace ? form : form.cloneNode(true));
	}