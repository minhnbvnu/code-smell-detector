function defaultSortFilteredOption(a, b, inputValue) {
	    function callback(elem) {
	        return elem.label.indexOf(inputValue) > -1;
	    }
	    return a.findIndex(callback) - b.findIndex(callback);
	}