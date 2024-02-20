async function runExperiment(arg, description) {
	console.time(description)
	var exif = await parse(arg, options)
	console.timeEnd(description)
	//console.log('lat lon', exif.latitude, exif.longitude)
}