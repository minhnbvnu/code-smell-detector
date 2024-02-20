function detectSupportsPassive() {
	var supportsPassive = false;

	try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function get() {
				supportsPassive = true;
			}
		});

		window.addEventListener('testPassive', null, opts);
		window.removeEventListener('testPassive', null, opts);
	} catch (e) {}

	return supportsPassive;
}