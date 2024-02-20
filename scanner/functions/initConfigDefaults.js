function initConfigDefaults() {
			if(config.escapeMode === undefined) {
				config.escapeMode = true;
			}
			
			config.attributePrefix = config.attributePrefix || "_";
			config.arrayAccessForm = config.arrayAccessForm || "none";
			config.emptyNodeForm = config.emptyNodeForm || "text";		
			
			if(config.enableToStringFunc === undefined) {
				config.enableToStringFunc = true; 
			}
			config.arrayAccessFormPaths = config.arrayAccessFormPaths || []; 
			if(config.skipEmptyTextNodesForObj === undefined) {
				config.skipEmptyTextNodesForObj = true;
			}
			if(config.stripWhitespaces === undefined) {
				config.stripWhitespaces = true;
			}
			config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];
	
			if(config.useDoubleQuotes === undefined) {
				config.useDoubleQuotes = false;
			}
			
			config.xmlElementsFilter = config.xmlElementsFilter || [];
			config.jsonPropertiesFilter = config.jsonPropertiesFilter || [];
			
			if(config.keepCData === undefined) {
				config.keepCData = false;
			}
		}