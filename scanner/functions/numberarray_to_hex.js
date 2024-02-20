function numberarray_to_hex(arr) {
		var str = "";
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] < 16)
				str += "0";
			str += arr[i].toString(16);
		}
		return str;
	}