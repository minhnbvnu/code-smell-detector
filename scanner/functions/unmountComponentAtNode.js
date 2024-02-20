function unmountComponentAtNode(container) {
	let existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		preactRender(h(EmptyComponent), container, existing);
		return true;
	}
	return false;
}