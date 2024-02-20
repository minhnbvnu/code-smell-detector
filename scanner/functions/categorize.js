function categorize(number) {
	if (number <= 0) return 0;
	var factor = 1;
	do {
		if (number <= 10) return number * factor;
		factor *= 10;
		number = Math.floor(number / 10);
	} while (number > 0);
	return "";
}