function prewalkDom(form, fn, inplace) {
		return prepost(prewalkStep, fn, walkDomInplace, inplace ? form : form.cloneNode(true));
	}