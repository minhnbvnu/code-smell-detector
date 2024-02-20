function modelMask(decimals) {
	var mask = '###0';

	if (decimals > 0) {
		mask += '.';
		for (var i = 0; i < decimals; i++) {
			mask += '0';
		}
	}

	return new StringMask(mask, {
		reverse: true
	});
}