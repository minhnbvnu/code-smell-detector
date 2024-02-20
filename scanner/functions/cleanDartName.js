function cleanDartName(name) {
	if (!name) { return ""; }
	name = name.replace(/^[\W\d]+|\W/ig, '');
	if (exports.DART_RESERVED_WORDS_MAP[name]) { name += "_"; }
	return name;
}