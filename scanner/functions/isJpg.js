function isJpg(fileName) {
	fileName = fileName.toLowerCase()
	return fileName.endsWith('.jpg')
		|| fileName.endsWith('.jpeg')
}