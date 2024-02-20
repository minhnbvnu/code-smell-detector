function cssSizeToLegacy(cssVal) {
		return {
			"xx-small": 1,
			"small": 2,
			"medium": 3,
			"large": 4,
			"x-large": 5,
			"xx-large": 6,
			"xxx-large": 7
		}[cssVal];
	}