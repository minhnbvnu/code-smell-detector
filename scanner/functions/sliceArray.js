function sliceArray(arr, limit) {
	let size = Math.min(arr.length, limit)
	let values = arr.slice(0, size)
	if (size < arr.length)
		return [values, arr.length - size]
	else
		return [values, 0]
}