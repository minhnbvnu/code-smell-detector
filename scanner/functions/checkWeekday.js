function checkWeekday(weekdayStr, parsedInput, config) {
	        if (weekdayStr) {
	            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
	            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
	                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
	            if (weekdayProvided !== weekdayActual) {
	                getParsingFlags(config).weekdayMismatch = true;
	                config._isValid = false;
	                return false;
	            }
	        }
	        return true;
	    }