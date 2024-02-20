function getMonthName(month) {
	  var locale = month.locale();
	  var localeData = month.localeData();
	  return localeData[locale === 'zh-cn' ? 'months' : 'monthsShort'](month);
	}