function cloneCjsAndMjsToJs() {
	return {
		writeBundle(bundle) {
			let newFileName = bundle.file.replace('.cjs', '.js').replace('.mjs', '.js')
			fs.copyFile(bundle.file, newFileName)
		}
	}
}