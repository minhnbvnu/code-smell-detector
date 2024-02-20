function detectColor(color) {
	if (/^(#)((?:[A-Fa-f0-9]{3}){1,2})$/.test(color)) { // #ff00ff and #f0f
		return color
	} else if (/^((?:[A-Fa-f0-9]{3}){1,2})$/.test(color)) { // ff00ff and f0f
		return '#' + color
	} else if (/^(#)((?:[A-Fa-f0-9]{8}))$/.test(color)) { // #ff00ffff and #f0ff
		return color.slice(0, 7)
	} else if (/^((?:[A-Fa-f0-9]{8}))$/.test(color)) { // ff00ffff and f0ff
		return '#' + color.slice(0, 6)
	}

	return false

}