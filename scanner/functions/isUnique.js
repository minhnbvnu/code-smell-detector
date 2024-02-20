function isUnique(arr) {
	var l = arr.length;
	for(var i = 0; i < l; i++ ) {
		if (arr.lastIndexOf(arr[i]) > i) return false;
	}
	return true;
}