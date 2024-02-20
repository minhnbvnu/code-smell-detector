function startLevelCreator(level) {
	return function() {
		navigateToLevel(level);
	}
}