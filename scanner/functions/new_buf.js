function new_buf(sz) {
	var o = (new_raw_buf(sz));
	prep_blob(o, 0);
	return o;
}