function isPointCoordinates(array) {
	if (array.length !== 2 && 
		!(typeof(array[0]) == "number" &&
		typeof(array[1]) == "number")) {
		return false;
	}

	return true;
}