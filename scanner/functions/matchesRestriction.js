function matchesRestriction(files, fileRestriction) {
	var matches = false;

	_.each(files, function(file) {
		if (typeof file === 'string') {
			matches |= _.includes(fileRestriction, file);
		} else if (typeof file === 'object') {
			// platform-specific TSS files result in an object
			// with a property of platform === true which needs
			// to be removed to prevent a compile error
			delete file.platform;
			matches |= matchesRestriction(file, fileRestriction);
		} else {
			throw 'Unsupported file type: ' + typeof file;
		}
	});

	return matches;
}