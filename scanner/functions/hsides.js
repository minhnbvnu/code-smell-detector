function hsides(element, includeMargins) {
	return hpadding(element) + hborders(element) + (includeMargins ? hmargins(element) : 0);
}