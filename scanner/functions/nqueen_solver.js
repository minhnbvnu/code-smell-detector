function nqueen_solver(size, board_mask, mask, left_mask, right_mask, unique_solutions)
{
    var masks= new Uint32Array(32);
    var left_masks= new Uint32Array(32);
    var right_masks= new Uint32Array(32);
    var ms= new Uint32Array(32);
    var ns;
    var ns_array= new Uint32Array(32);
    var t_array= new Uint32Array(32);
    var board_array = new Int32Array(32);
    var solutions = 0;
    var total_solutions = 0;
    var i = 0;
    var j, k;
    var border_mask = 0;
    var index;

    forbidden = new Uint32Array(32);

    masks[0] = mask;
    left_masks[0] = left_mask;
    right_masks[0] = right_mask;
    ms[0] = mask | left_mask | right_mask;
    ns_array[0] = mask;

    index = bit_scan(mask);
    for(j = 0; j < index; j++) {
	border_mask |= (1 << j);
	border_mask |= (1 << (size - j - 1));
    }

    for(k = 0; k < size; k++) {
	if(k == size - 2) {
	    forbidden[k] = border_mask;
	}
	else if((k + 1) < index || (k + 1) > size - index - 1) {
	    forbidden[k] = 1 | (1 << (size - 1));
	}
	else {
	    forbidden[k] = 0;
	}
    }

    while(i >= 0) {
	var m = ms[i] | forbidden[i];
	ns = (m + 1) & ~m;

	if((ns & board_mask) != 0) {
	    ns_array[i+1] = ns;
	    if(i == size - 2) {
		var repeat_times = 8;
		var rotate1 = false;
		var rotate2 = false;
		var rotate3 = false;

		if(ns_array[index] == (1 << (size - 1))) rotate1 = true;
		if(ns_array[size - index - 1] == 1) rotate2 = true;
		if(ns_array[size - 1] == (1 << (size - index - 1))) rotate3 = true;

		if(rotate1 || rotate2 || rotate3) {
		    transform(ns_array, board_array, size);
		    var repeat_times = 8;
		    var equal = true;
		    var min_pos = size;
		    var relation = 0;
		    var j;

		    // rotate cw
		    if(rotate1) {
			equal = true;
			relation = 0;
			for(j = 0; j < size; j++) {
			    if(board_array[size - board_array[j] - 1] != j) {
				equal = false;
				if(min_pos > size - board_array[j] - 1) {
				    relation = board_array[size - board_array[j] - 1] - j;
				    min_pos = size - board_array[j] - 1;
				}
			    }
			}

			repeat_times = equal ? 2 : repeat_times;
		    }

		    if(relation >= 0 && rotate2) {
			// rotate ccw
			equal = true;
			min_pos = size;
			relation = 0;
			for(j = 0; j < size; j++) {
			    if(board_array[board_array[j]] != size - j - 1) {
				equal = false;
				if(min_pos > board_array[j]) {
				    relation = board_array[board_array[j]] - (size - j - 1);
				    min_pos = board_array[j];
				}
			    }
			}

			repeat_times = equal ? 2 : repeat_times;
		    }

		    if(relation >= 0 && repeat_times == 8 && rotate3) {
			// rotate 180
			equal = true;
			min_pos = size;
			relation = 0;
			for(j = size - 1; j >= size / 2; j--) {
			    if(board_array[size - j - 1] != size - board_array[j] - 1) {
				equal = false;
				relation = board_array[size - j - 1] - (size - board_array[j] - 1);
				break;
			    }
			}

			repeat_times = equal ? 4 : repeat_times;
		    }

		    total_solutions += (relation >= 0) ? repeat_times : 0;
		    solutions += (relation >= 0) ? 1 : 0;
		}
		else {
		    total_solutions += 8;
		    solutions++;
		}

		i--;
	    }
	    else {
		ms[i] |= ns;
		masks[i+1] = masks[i] | ns;
		left_masks[i+1] = (left_masks[i] | ns) << 1;
		right_masks[i+1] = (right_masks[i] | ns) >> 1;
		ms[i+1] = masks[i+1] | left_masks[i+1] | right_masks[i + 1];
		i++;
	    }
	}
	else {
	    i--;
	}
    }

    unique_solutions["solutions"] = solutions;
    return total_solutions;
}