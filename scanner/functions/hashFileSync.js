function hashFileSync(filePath, options) {
	return hashSync(fs.readFileSync(filePath), options);
}