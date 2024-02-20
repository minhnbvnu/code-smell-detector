function postpruneDom(form, pred, inplace) {
		return prepost(postpruneStep, pred, walkDomInplace, inplace ? form : form.cloneNode(true));
	}