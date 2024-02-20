function make_canvas(width, height){
	const image = width;
	
	const new_canvas = E("canvas");
	const new_ctx = new_canvas.getContext("2d");
	
	new_canvas.ctx = new_ctx;
	
	new_ctx.disable_image_smoothing = ()=> {
		new_ctx.imageSmoothingEnabled = false;
		// condition is to avoid a deprecation warning in Firefox
		if (new_ctx.imageSmoothingEnabled !== false) {
			new_ctx.mozImageSmoothingEnabled = false;
			new_ctx.webkitImageSmoothingEnabled = false;
			new_ctx.msImageSmoothingEnabled = false;
		}
	};
	new_ctx.enable_image_smoothing = ()=> {
		new_ctx.imageSmoothingEnabled = true;
		if (new_ctx.imageSmoothingEnabled !== true) {
			new_ctx.mozImageSmoothingEnabled = true;
			new_ctx.webkitImageSmoothingEnabled = true;
			new_ctx.msImageSmoothingEnabled = true;
		}
	};
	
	// @TODO: simplify the abstraction by defining setters for width/height
	// that reset the image smoothing to disabled
	// and make image smoothing a parameter to make_canvas
	
	new_ctx.copy = image => {
		new_canvas.width = image.naturalWidth || image.width;
		new_canvas.height = image.naturalHeight || image.height;
		
		// setting width/height resets image smoothing (along with everything)
		new_ctx.disable_image_smoothing();
		
		if (image instanceof ImageData) {
			new_ctx.putImageData(image, 0, 0);
		} else {
			new_ctx.drawImage(image, 0, 0);
		}
	};
	
	if(width && height){
		// make_canvas(width, height)
		new_canvas.width = width;
		new_canvas.height = height;
		// setting width/height resets image smoothing (along with everything)
		new_ctx.disable_image_smoothing();
	}else if(image){
		// make_canvas(image)
		new_ctx.copy(image);
	}
	
	return new_canvas;
}