function getColumns(_ref) {
	    var showHour = _ref.showHour,
	        showMinute = _ref.showMinute,
	        showSecond = _ref.showSecond,
	        use12Hours = _ref.use12Hours;

	    var column = 0;
	    if (showHour) {
	        column += 1;
	    }
	    if (showMinute) {
	        column += 1;
	    }
	    if (showSecond) {
	        column += 1;
	    }
	    if (use12Hours) {
	        column += 1;
	    }
	    return column;
	}