function element_to_string(element) {
	// returns a CSS-selector-like string for the given element
	// if (element instanceof Element) { // doesn't work with different window.Element from iframes
	if (typeof element === "object" && "tagName" in element) {
		return element.tagName.toLowerCase() +
			(element.id ? "#" + element.id : "") +
			(element.className ? "." + element.className.split(" ").join(".") : "") +
			(element.src ? `[src="${element.src}"]` : "") + // Note: not escaped; may not actually work as a selector (but this is for debugging)
			(element.srcdoc ? "[srcdoc]" : "") + // (srcdoc can be long)
			(element.href ? `[href="${element.href}"]` : "");
	} else if (element) {
		return element.constructor.name;
	} else {
		return `${element}`;
	}
}