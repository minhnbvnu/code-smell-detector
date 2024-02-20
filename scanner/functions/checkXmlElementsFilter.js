function checkXmlElementsFilter(obj, childType, childName, childPath) {
			if( childType == DOMNodeTypes.ELEMENT_NODE && config.xmlElementsFilter.length > 0) {
				return checkInStdFiltersArrayForm(config.xmlElementsFilter, obj, childName, childPath);	
			}
			else
				return true;
		}