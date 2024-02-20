function tabbable(element) {
	let tabIndex = element.getAttribute('tabindex');
	if (tabIndex === null) tabIndex = undefined;
	const isTabIndexNaN = isNaN(tabIndex);
	return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}