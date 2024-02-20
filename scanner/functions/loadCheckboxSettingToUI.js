function loadCheckboxSettingToUI(checkboxSelector, storeKey, defaultVal) {
	document.querySelector(checkboxSelector).checked = store.get(storeKey, defaultVal);
}