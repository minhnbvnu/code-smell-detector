async function waitForToken() {
	const input = document.querySelector('#token');

	if (localStorage.token) {
		input.value = localStorage.token;
	} else {
		const toggle = document.querySelector('#token-toggle');
		toggle.checked = true;
		updateStatus('Waiting for token…');
		await new Promise(resolve => {
			input.addEventListener('input', function handler() {
				if (input.checkValidity()) {
					toggle.checked = false;
					resolve();
					input.removeEventListener('input', handler);
				}
			});
		});
	}
}