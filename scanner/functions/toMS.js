function toMS(arr) {
	return colors.white().bold(`${(arr[1] / 1e6).toFixed(2)}ms`);
}