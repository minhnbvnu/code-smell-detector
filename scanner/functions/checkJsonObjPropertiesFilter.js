function checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
			return config.jsonPropertiesFilter.length == 0
				|| jsonObjPath==""
				|| checkInStdFiltersArrayForm(config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);	
		}