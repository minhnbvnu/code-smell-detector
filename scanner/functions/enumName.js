function enumName(enumeration, value) {
	for (let [k, v] of Object.entries(enumeration)) {
		if (v == value) {
			return k;
		}
	}
	return "";
}