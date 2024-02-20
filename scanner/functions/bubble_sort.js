function bubble_sort(arr) {
	if(arr.length <= 1) {
		return arr;
	}
	for(let i = arr.length - 1; i >= 0; i--) {
		let flag = true;
		for(let j = i - 1; j >= 0; j--) {
			if(arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				flag = false;
			}
		}
		if(flag) {
			break;
		}
	}
	return arr;
}