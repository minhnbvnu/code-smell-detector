function run1(str, code) {
	return enabled1 ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}