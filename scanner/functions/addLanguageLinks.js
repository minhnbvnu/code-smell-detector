function addLanguageLinks(dom, file, locales) {
	var head = dom.querySelector('head')
	return Object.keys(locales).map(function (locale) {
		var link = createLanguageLink(dom, (locale != 'en' ? '/' + locale : '') + '/' + (file === 'index.html' ? '' : file), locale)
		head.appendChild(link)
		return link
	})
}