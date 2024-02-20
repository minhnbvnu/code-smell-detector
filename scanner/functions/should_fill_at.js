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