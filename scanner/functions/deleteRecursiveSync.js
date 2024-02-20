function deleteRecursiveSync(fs, itemPath) {
		if (fs.statSync(itemPath).isDirectory()) {
			for (const childItemName of fs.readdirSync(itemPath)) {
				deleteRecursiveSync(itemPath + "/" + childItemName);
			}
			fs.rmdirSync(itemPath);
		} else {
			fs.unlinkSync(itemPath);
		}
	}