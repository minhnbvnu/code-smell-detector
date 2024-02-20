function parseManifestAsCollection(wFile) {
		var wDir = path.dirname(wFile);
		var manifest;
		try {
			manifest = jsonlint.parse(fs.readFileSync(wFile, 'utf8'));
		} catch (e) {
			exports.die('Error parsing "' + wFile + '"', e);
		}

		return {
			dir: wDir,
			manifest: manifest
		};
	}