function jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
			if((config.arrayAccessForm=="property" && endsWith(jsonObjField.toString(),("_asArray"))) 
					|| jsonObjField.toString().indexOf(config.attributePrefix)==0 
					|| jsonObjField.toString().indexOf("__")==0
					|| (jsonObj[jsonObjField] instanceof Function) )
				return true;
			else
				return false;
		}