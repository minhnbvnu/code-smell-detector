function find_color_globally(source_image_data, dest_image_data, find_r, find_g, find_b, find_a) {
	const source_data = source_image_data.data;
	const dest_data = dest_image_data.data;
	for(let i = 0; i < source_data.length; i += 4){
		if(
			Math.abs(source_data[i+0] - find_r) <= fill_threshold &&
			Math.abs(source_data[i+1] - find_g) <= fill_threshold &&
			Math.abs(source_data[i+2] - find_b) <= fill_threshold &&
			Math.abs(source_data[i+3] - find_a) <= fill_threshold
		){
			dest_data[i+0] = 255;
			dest_data[i+1] = 255;
			dest_data[i+2] = 255;
			dest_data[i+3] = 255;
		}
	}
}