async function diyParseGps() {
	let options = {
		// setting false on these blocks does not read them at all, except for IFD0 which is necessary
		// because it contains pointer to GPS IFD. Though no tag values are read and once GPS pointer
		// is found the IFD0 search-through ends.
		ifd0: false,
		exif: false,
		// Instead of `true` you can use array of tags to read. All other tags are not read at all.
		// You can use string tag names as well as their numeric code. In this example 0x0004 = GPSLongitude
		gps: ['GPSLatitudeRef', 'GPSLatitude', 0x0003, 0x0004],
		interop: false,
		ifd1: false // thumbnail
	}
	let gps = await exifr.parse('../test/fixtures/IMG_20180725_163423.jpg', options)
	// raw values
	console.log('GPSLatitude', gps.GPSLatitude, gps.GPSLatitudeRef)
	console.log('GPSLongitude', gps.GPSLongitude, gps.GPSLongitudeRef)
	// exifr calculates these into useful coordinates
	console.log(gps.latitude, gps.longitude)
}