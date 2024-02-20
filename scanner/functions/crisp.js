function crisp(arr) {
	var i = arr.length;
	while (i--) {
		if (typeof arr[i] === 'number') {
			arr[i] = Math.round(arr[i]) - 0.5;		
		}
	}
	return arr;
}