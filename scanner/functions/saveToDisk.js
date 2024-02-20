async function saveToDisk(xmpNamespace, fileName) {
	let fs = await import('fs').then(fs => fs.promises)
	// The depth map is stored as base64 string
	let base64 = xmpNamespace.Data
	let fileExt = xmpNamespace.Mime.split('/').pop()
	let buffer = Buffer.from(base64, 'base64')
	fs.writeFile(fileName + '.' + fileExt, buffer)
}