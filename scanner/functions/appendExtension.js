function appendExtension(file, extension) {
	extension = '.' + extension;
	file = U.trim(file);

	var len = extension.length;
	if (file.substring(file.length - extension.length) !== extension) {
		return file + extension;
	} else {
		return file;
	}
}