function resetSettingsDropdown() {
	const button = document.querySelector(isPreviousMessengerVersion() ? SETTINGS_BUTTON_PREV : SETTINGS_BUTTON);
	if (button) {
		button.click();
		button.click();  // clicking again to hide
	}
}