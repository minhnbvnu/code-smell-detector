function getTodayTime(value) {
	  var today = (0, _moment2['default'])();
	  today.locale(value.locale()).utcOffset(value.utcOffset());
	  return today;
	}