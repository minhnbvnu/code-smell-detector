function addTranslationNav(dom, file, languages) {
	var items = []
	var nav = dom.createElement('ul')
	nav.className = "nav-lang"

	Object.keys(languages).sort(function (a, b) {
		return languages[a] > languages[b] ? 1 : -1
	}).forEach(function(lang) {
		var button = createLangButton(dom, file, lang, languages[lang])
		items.push(button.firstChild)
		nav.appendChild(button)
	})
	var node = dom.querySelector('header > *:first-child')
	if (node) {
		node.parentNode.insertBefore(createSkipButton(dom), node)
		node.parentNode.insertBefore(nav, node)
	}
	return items
}