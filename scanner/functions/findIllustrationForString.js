function findIllustrationForString(str) {
	for (const illustration of data) {
		for (const illustrationString of illustration.strings) {
			const regex = new RegExp('\\b' + illustrationString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\b', 'gi')
			if (str.match(regex) !== null) {
				return imagePath('calendar', 'illustrations/'
								+ illustration.illustrationNames[str.charCodeAt(str.length - 1) % illustration.illustrationNames.length])
			}
		}
	}

	return null
}