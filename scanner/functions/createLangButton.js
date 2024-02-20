function createLangButton(dom, file, lang, langName) {
var li = dom.createElement('li')
	li.className = 'nav-lang-' + lang
	li.innerHTML = '<a href="/' + (lang === 'en' ? '' : lang + '/') + (file === 'index.html' ? '' : file) + '" class="switch-lang" lang="' + lang + '">' + langName + '</a>'
	return li
}