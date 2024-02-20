function popLoading() {
		if (!--loadingLevel) {
			trigger('loading', null, false);
		}
	}