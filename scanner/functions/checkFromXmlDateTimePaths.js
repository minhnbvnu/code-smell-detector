function checkFromXmlDateTimePaths(value, childName, fullPath) {
			if(config.datetimeAccessFormPaths.length > 0) {
				var path = fullPath.split("\.#")[0];
				if(checkInStdFiltersArrayForm(config.datetimeAccessFormPaths, value, childName, path)) {
					return fromXmlDateTime(value);
				}
				else
					return value;			
			}
			else
				return value;
		}