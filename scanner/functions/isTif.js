function isTif(fileName) {
	fileName = fileName.toLowerCase()
	return fileName.endsWith('.tiff')
		|| fileName.endsWith('.tif')
}