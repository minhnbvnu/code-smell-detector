function isTimeValid(value, disabledTime) {
	  var disabledTimeConfig = getTimeConfig(value, disabledTime);
	  return isTimeValidByConfig(value, disabledTimeConfig);
	}