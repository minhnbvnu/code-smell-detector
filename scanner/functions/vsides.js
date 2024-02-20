function vsides(element, includeMargins) {
	return vpadding(element) +  vborders(element) + (includeMargins ? vmargins(element) : 0);
}