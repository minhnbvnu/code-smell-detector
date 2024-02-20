function whenUIChromeLoaded(callback) {
	let fired = false;
	document.addEventListener('DOMContentLoaded', () => {
		const observer = new MutationObserver(mutations => {
			if (fired) {
				return;
			}
	
			mutations.forEach((mutation) => {
				switch(mutation.type) {
					case 'childList':
						// UI chrome is loaded once left column is loaded
						if (!mutation.target.querySelector('._1enh._7q1s')) {
							return;
						}
						callback();
						fired = true;
						observer.disconnect();
						break;
					default:
						break;
				}
			});
		});

		observer.observe(
			document.querySelector('body'),
			{
				subtree: true,
				childList: true,
			}
		);
	});
}