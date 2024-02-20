function bindCheckboxUI(checkboxSelector, storeKey) {
	const checkboxElem = document.querySelector(checkboxSelector);
	checkboxElem.addEventListener('change', () => {
		store.set(storeKey, checkboxElem.checked);
		loadSettingsToUI();
	});
}