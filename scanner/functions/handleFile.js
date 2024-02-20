function handleFile(xmpNamespace, fileName) {
	if (isBrowser)
		displayInBrowser(xmpNamespace, fileName)
	else
		saveToDisk(xmpNamespace, fileName)
}