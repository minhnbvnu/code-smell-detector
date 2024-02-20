function do_fill_at(pixel_pos){
		dest_id.data[pixel_pos+0] = fill_r;
		dest_id.data[pixel_pos+1] = fill_g;
		dest_id.data[pixel_pos+2] = fill_b;
		dest_id.data[pixel_pos+3] = fill_a;
	}