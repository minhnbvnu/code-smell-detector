function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) return;

	let href = node.getAttribute('href'),
		target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i)))
		return;

	// attempt to route, if no match simply cede control to browser
	return route(href);
}