function readJsonFromFile(path) {
	return JSON.parse(fs.readFileSync(path, 'utf8'))
}