function loadBuiltin(source, name, dest) {
	if (!path.existsSync(source)) {
		return;
	}

	logger.debug('  - [' + name + '] --> "' + dest + '"');
	U.copyFileSync(source, dest);
	loaded = _.union(loaded, [name]);
}