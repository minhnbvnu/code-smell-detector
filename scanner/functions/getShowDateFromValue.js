function getShowDateFromValue(value) {
	    var _value = (0, _slicedToArray3['default'])(value, 2),
	        start = _value[0],
	        end = _value[1];
	    // value could be an empty array, then we should not reset showDate


	    if (!start && !end) {
	        return;
	    }
	    var newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
	    return [start, newEnd];
	}