function threshold_black_and_white(ctx, threshold) {
	const image_data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	for(let i=0; i<image_data.data.length; i+=4){
		const white = (image_data.data[i+0] + image_data.data[i+1] + image_data.data[i+2]) / 3 / 255 > threshold;
		image_data.data[i+0] = 255 * white;
		image_data.data[i+1] = 255 * white;
		image_data.data[i+2] = 255 * white;
		image_data.data[i+3] = 255;
	}
	ctx.putImageData(image_data, 0, 0);
}