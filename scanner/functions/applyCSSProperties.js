function applyCSSProperties(cssProperties, options = {}) {
	// @TODO: clean up deprecated argument handling
	let element, recurseIntoIframes;
	if ("tagName" in options) {
		console.warn("deprecated: use options argument to applyCSSProperties, e.g. applyCSSProperties(cssProperties, { element: document.documentElement, recurseIntoIframes: true })");
		element = options;
		recurseIntoIframes = false;
	} else {
		({ element = document.documentElement, recurseIntoIframes = false } = options);
	}

	var getProp = (propName) => cssProperties.getPropertyValue ? cssProperties.getPropertyValue(propName) : cssProperties[propName];
	for (var k in cssProperties) {
		element.style.setProperty(k, getProp(k));
	}
	// iframe theme propagation
	if (recurseIntoIframes) {
		var iframes = element.querySelectorAll("iframe");
		for (var i = 0; i < iframes.length; i++) {
			try {
				applyCSSProperties(cssProperties, { element: iframes[i].contentDocument.documentElement, recurseIntoIframes: true });
			} catch (error) {
				// ignore
				// @TODO: share warning with $Window's iframe handling
			}
		}
	}
}