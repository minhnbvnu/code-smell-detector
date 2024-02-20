function initEventListeners() {
	if (eventListenersInitialized) return;
	eventListenersInitialized = true;

	if (!customHistory) {
		addEventListener('popstate', () => {
			routeTo(getCurrentUrl());
		});
	}
	addEventListener('click', delegateLinkHandler);
}