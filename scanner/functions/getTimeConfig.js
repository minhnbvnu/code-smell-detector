function getTimeConfig(value, disabledTime) {
	  var disabledTimeConfig = disabledTime ? disabledTime(value) : {};
	  disabledTimeConfig = (0, _extends3['default'])({}, defaultDisabledTime, disabledTimeConfig);
	  return disabledTimeConfig;
	}