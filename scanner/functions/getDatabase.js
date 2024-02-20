function getDatabase(name) {
	if (!cache.db[name]) {
		cache.db[name] = Ti.Database.open(name);
	}
	return cache.db[name];
}