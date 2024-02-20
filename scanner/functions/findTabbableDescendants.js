function findTabbableDescendants(element) {
	return [].slice
		.call(element.querySelectorAll('*'), 0)
		.filter((el) => tabbable(el));
}