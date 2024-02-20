function image_data_match(a, b, threshold) {
	const a_data = a.data;
	const b_data = b.data;
	if (a_data.length !== b_data.length) {
		return false;
	}
	for (let len = a_data.length, i = 0; i < len; i++) {
		if (a_data[i] !== b_data[i]) {
			if (Math.abs(a_data[i] - b_data[i]) > threshold) {
				return false;
			}
		}
	}
	return true;
}