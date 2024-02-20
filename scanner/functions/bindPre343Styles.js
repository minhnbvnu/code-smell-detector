function bindPre343Styles() {
	whenUIChromeLoaded(() => {
		if (isPreviousMessengerVersion()) {
			const classList = document.querySelector('#facebook').classList;
			if (!classList.contains('goofy343')) {
				classList.add('goofy343');
			}
		}
	});
}