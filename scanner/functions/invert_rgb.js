function invert_rgb(source_ctx, dest_ctx=source_ctx) {
	const image_data = source_ctx.getImageData(0, 0, source_ctx.canvas.width, source_ctx.canvas.height);
	for(let i=0; i<image_data.data.length; i+=4){
		image_data.data[i+0] = 255 - image_data.data[i+0];
		image_data.data[i+1] = 255 - image_data.data[i+1];
		image_data.data[i+2] = 255 - image_data.data[i+2];
	}
	dest_ctx.putImageData(image_data, 0, 0);
}