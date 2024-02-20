async function extractDepthMap(filePath) {
	// clear previous image
	if (isBrowser) {
		dom['input-file'].src   = filePath
		dom['depth-map'].src    = ''
		dom['depth-source'].src = ''
		dom['log'].innerHTML = ''
	}
	// extract the data from file
	let output = await exifr.parse(filePath, options)
	if (output && output.GDepth) {
		log('The file contains depth map')
		log('GDepth.Format', output.GDepth.Format)
		log('GDepth.Near', output.GDepth.Near)
		log('GDepth.Far', output.GDepth.Far)
		log('GDepth.Mime', output.GDepth.Mime)
		// store or display the depth map image
		handleFile(output.GDepth, 'depth-map')
	} else {
		log('The file has no depth map')
		return
	}
	// Besides depth map, there can be original image with no blurring applied.
	// NOTE: GImage can be also used for "the other eye" in VR photos
	if (output && output.GImage) {
		log('The file contains unmodified original photo')
		log('GImage.Mime', output.GImage.Mime)
		// store or display the source image
		handleFile(output.GImage, 'depth-source')
	} else {
		log(`The file doesn't contain unmodified image`)
	}
}