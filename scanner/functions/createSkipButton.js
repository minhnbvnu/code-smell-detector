function createSkipButton(dom) {
	var a = dom.createElement('a')
	a.className = 'skip'
	a.href = '#main'
	a.innerHTML = 'Skip to Content'
	return a
}