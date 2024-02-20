function defaultFilterOption(inputValue, path) {
	    return path.some(function (option) {
	        return option.label.indexOf(inputValue) > -1;
	    });
	}