function joinValues(arr, delimiter=", ") {
	return arr.filter(n => n != null && n !== "").join(delimiter);
}