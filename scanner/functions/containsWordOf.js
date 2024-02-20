function containsWordOf(arr, string) {
		string = string.toLowerCase();
		var flag = false;
		for(var i = 0; i < arr.length; i++) {
			if (string === arr[i] ||
          string.indexOf(wrapInSpaces(arr[i])) !== -1 ||
          string.startsWith(arr[i]) ||
          string.endsWith(arr[i])) {
				flag = true;
				break;
			}
		}
		return flag;
	}