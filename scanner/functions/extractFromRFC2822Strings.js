function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
	        var result = [
	            untruncateYear(yearStr),
	            defaultLocaleMonthsShort.indexOf(monthStr),
	            parseInt(dayStr, 10),
	            parseInt(hourStr, 10),
	            parseInt(minuteStr, 10)
	        ];

	        if (secondStr) {
	            result.push(parseInt(secondStr, 10));
	        }

	        return result;
	    }