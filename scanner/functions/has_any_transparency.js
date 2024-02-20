function has_any_transparency(ctx) {
	// @TODO Optimization: Assume JPEGs and some other file types are opaque.
	// Raster file formats that SUPPORT transparency include GIF, PNG, BMP and TIFF
	// (Yes, even BMPs support transparency!)
	const id = ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);
	for(let i=0, l=id.data.length; i<l; i+=4){
		// I've seen firefox give [ 254, 254, 254, 254 ] for get_rgba_from_color("#fff")
		// or other values
		if(id.data[i+3] < 253){
			return true;
		}
	}
	return false;
}