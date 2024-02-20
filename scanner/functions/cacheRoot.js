function cacheRoot(options) {
	if (options.cacheDir) return options.cacheDir;
	var home = homeDir();
	if (!home) throw new Error("HOME not found, unable to store Streamline callback cache");
	return fsp.join(home, ".streamline");
}