function pushLoading() {
		if (!loadingLevel++) {
			trigger('loading', null, true);
		}
	}