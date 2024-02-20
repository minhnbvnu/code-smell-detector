async function getFile (path) {
	// Cache file
	if (cache[path]) {
		return cache[path]
	}

	return new Promise((resolve, reject) => {
		const watcher = chokidar.watch(path)

		// This `readFile` func is looking like it escaped from procedure programming
		const readFile = () => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err) {
					throw err
				}
				const json = JSON.parse(data)
				cache[path] = json
				watcher.close()
				resolve(json)
			})
		}
		// does file exist?
		fs.access(path, fs.constants.R_OK, err => {
			if (err) {
				// No. Watch for changes, resolve on `add`.
				watcher.on('add', readFile)
			} else {
				// Yes. resolve!
				readFile()
			}
		})
	})
}