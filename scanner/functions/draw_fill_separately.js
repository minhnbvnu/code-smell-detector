function draw_fill_separately(source_ctx, dest_ctx, start_x, start_y, fill_r, fill_g, fill_b, fill_a) {
	if (fill_a === 0) {
		throw new Error("Filling with alpha of zero is not supported. Zero alpha is used for detecting whether a pixel has been visited.");
	}
	const c_width = main_canvas.width;
	const c_height = main_canvas.height;
	start_x = Math.max(0, Math.min(Math.floor(start_x), c_width));
	start_y = Math.max(0, Math.min(Math.floor(start_y), c_height));
	const stack = [[start_x, start_y]];
	const source_id = source_ctx.getImageData(0, 0, c_width, c_height);
	const dest_id = dest_ctx.getImageData(0, 0, c_width, c_height);
	let pixel_pos = (start_y*c_width + start_x) * 4;
	const start_r = source_id.data[pixel_pos+0];
	const start_g = source_id.data[pixel_pos+1];
	const start_b = source_id.data[pixel_pos+2];
	const start_a = source_id.data[pixel_pos+3];
	
	while(stack.length){
		let new_pos;
		let x;
		let y;
		let reach_left;
		let reach_right;
		new_pos = stack.pop();
		x = new_pos[0];
		y = new_pos[1];

		pixel_pos = (y*c_width + x) * 4;
		while(should_fill_at(pixel_pos)){
			y--;
			pixel_pos = (y*c_width + x) * 4;
		}
		reach_left = false;
		reach_right = false;
		// eslint-disable-next-line no-constant-condition
		while(true){
			y++;
			pixel_pos = (y*c_width + x) * 4;
			
			if(!(y < c_height && should_fill_at(pixel_pos))){
				break;
			}
			
			do_fill_at(pixel_pos);

			if(x > 0){
				if(should_fill_at(pixel_pos - 4)){
					if(!reach_left){
						stack.push([x - 1, y]);
						reach_left = true;
					}
				}else if(reach_left){
					reach_left = false;
				}
			}

			if(x < c_width-1){
				if(should_fill_at(pixel_pos + 4)){
					if(!reach_right){
						stack.push([x + 1, y]);
						reach_right = true;
					}
				}else if(reach_right){
					reach_right = false;
				}
			}

			pixel_pos += c_width * 4;
		}
	}
	dest_ctx.putImageData(dest_id, 0, 0);

	function should_fill_at(pixel_pos){
		return (
			// not reached yet
			dest_id.data[pixel_pos+3] === 0 &&
			// and matches start color (i.e. region to fill)
			(
				Math.abs(source_id.data[pixel_pos+0] - start_r) <= fill_threshold &&
				Math.abs(source_id.data[pixel_pos+1] - start_g) <= fill_threshold &&
				Math.abs(source_id.data[pixel_pos+2] - start_b) <= fill_threshold &&
				Math.abs(source_id.data[pixel_pos+3] - start_a) <= fill_threshold
			)
		);
	}

	function do_fill_at(pixel_pos){
		dest_id.data[pixel_pos+0] = fill_r;
		dest_id.data[pixel_pos+1] = fill_g;
		dest_id.data[pixel_pos+2] = fill_b;
		dest_id.data[pixel_pos+3] = fill_a;
	}
}