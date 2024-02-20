function getLevelName(level) {
	const levelName = byLevel[level];
	if (levelName) {
		return levelName;
	}
	throw new Error(`no level name found for level: ${level}`);
}