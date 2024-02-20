function setcat(lists) {
		var result = [];
		$.each(lists, function (index, item) {
			result = result.concat(item);
		});
		$.unique(result);
		return result;
	}