function legacySizeToCss(legacyVal) {
		return {
			1: "xx-small",
			2: "small",
			3: "medium",
			4: "large",
			5: "x-large",
			6: "xx-large",
			7: "xxx-large"
		}[legacyVal];
	}