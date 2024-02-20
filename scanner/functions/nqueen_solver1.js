function nqueen_solver1(size, idx)
{

    var masks = new Uint32Array(32);
    var left_masks = new Uint32Array(32);
    var right_masks = new Uint32Array(32);
    var ms = new Uint32Array(32);
    var ns = ns | 0;
    var solutions = 0;
    var i = 0;

    masks[0] = 1 | 1 << idx;
    left_masks[0] = (1 << 2) | (1 << (idx + 1));
    right_masks[0] = (1 << idx) >> 1;
    ms[0] = masks[0] | left_masks[0] | right_masks[0];
    var board_mask = (1 << size) - 1;

    while(i >= 0) {
	var m = ms[i] | ((i + 2) < idx ? 2 : 0);
	ns = (m + 1) & ~m;
	if((ns & board_mask) != 0) {
	    if(i == size - 3) {
		solutions++;
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
    return solutions;
}