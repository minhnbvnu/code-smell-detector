function createLanguageLink(dom, href, locale) {
	var link = dom.createElement('link')
	link.setAttribute('rel', 'alternate')
	link.setAttribute('href', href)
	link.setAttribute('hreflang', locale)
	return link
}