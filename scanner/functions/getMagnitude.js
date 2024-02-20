function getMagnitude(num) {
	return math.pow(10, mathFloor(math.log(num) / math.LN10));
}