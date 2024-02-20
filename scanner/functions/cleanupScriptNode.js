function cleanupScriptNode(response) {
	try {
		if (response.raw && response.raw.parentNode) {
			response.raw.parentNode.removeChild(response.raw);
		}
	} catch (e) {
		// ignore
	}
}