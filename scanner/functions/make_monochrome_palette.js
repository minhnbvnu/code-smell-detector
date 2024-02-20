function make_monochrome_palette(rgba1=[0, 0, 0, 255], rgba2=[255, 255, 255, 255]){
	const palette = [];
	const n_colors_per_row = 14;
	const n_colors = n_colors_per_row * 2;
	for(let i=0; i<n_colors_per_row; i++){
		let lightness = i / n_colors;
		palette.push(make_monochrome_pattern(lightness, rgba1, rgba2));
	}
	for(let i=0; i<n_colors_per_row; i++){
		let lightness = 1 - i / n_colors;
		palette.push(make_monochrome_pattern(lightness, rgba1, rgba2));
	}

	return palette;
}