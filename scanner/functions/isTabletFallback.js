function isTabletFallback() {
	return Math.min(
		Ti.Platform.displayCaps.platformHeight,
		Ti.Platform.displayCaps.platformWidth
	) >= 700;
}