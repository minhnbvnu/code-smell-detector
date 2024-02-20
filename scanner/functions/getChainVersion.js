function getChainVersion() {
	if (utils.version == 100) {
		return '1.0.0'
	} else if (utils.version == 200) {
		return '2.0.0';
	} else if (utils.version == 210) {
		return '2.1.0';
	} else if (utils.version == 300) {
		return '3.0.0';
	} else if (utils.version == 400) {
		return '4.0.0';
	} else if (utils.version == 500) {
		return '5.0.0';
	} else if (utils.version == 510) {
		return '5.1.0';
	} else if (utils.version == 600) {
		return '6.0.0';
	} else {
		throw new Error('AltCaller not supported');
	}
}