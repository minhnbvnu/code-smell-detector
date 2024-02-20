function getValueFromSelectedValue(selectedValue) {
	  var _selectedValue = (0, _slicedToArray3['default'])(selectedValue, 2),
	      start = _selectedValue[0],
	      end = _selectedValue[1];

	  var newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
	  return [start, newEnd];
	}