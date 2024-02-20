function npify(text) {
	return text.replace(/:\/\/www\.reddit\./g, "://np.reddit.");
}