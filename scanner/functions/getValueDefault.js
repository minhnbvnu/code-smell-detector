function getValueDefault(name, defaultValue) {
	var value = GM_getValue(name);
	if (value != null)
		return value;
	else
		return defaultValue;
}