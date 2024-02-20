function parseJSONObject ( jsonObj, jsonObjPath ) {
			var result = "";	
	
			var elementsCnt = jsonXmlElemCount ( jsonObj );
			
			if(elementsCnt > 0) {
				for( var it in jsonObj ) {
					
					if(jsonXmlSpecialElem ( jsonObj, it) || (jsonObjPath!="" && !checkJsonObjPropertiesFilter(jsonObj, it, getJsonPropertyPath(jsonObjPath,it))) )
						continue;			
					
					var subObj = jsonObj[it];						
					
					var attrList = parseJSONAttributes( subObj )
					
					if(subObj == null || subObj == undefined) {
						result+=startTag(subObj, it, attrList, true);
					}
					else
					if(subObj instanceof Object) {
						
						if(subObj instanceof Array) {					
							result+=parseJSONArray( subObj, it, attrList, jsonObjPath );					
						}
						else if(subObj instanceof Date) {
							result+=startTag(subObj, it, attrList, false);
							result+=subObj.toISOString();
							result+=endTag(subObj,it);
						}
						else {
							var subObjElementsCnt = jsonXmlElemCount ( subObj );
							if(subObjElementsCnt > 0 || subObj.__text!=null || subObj.__cdata!=null) {
								result+=startTag(subObj, it, attrList, false);
								result+=parseJSONObject(subObj, getJsonPropertyPath(jsonObjPath,it));
								result+=endTag(subObj,it);
							}
							else {
								result+=startTag(subObj, it, attrList, true);
							}
						}
					}
					else {
						result+=startTag(subObj, it, attrList, false);
						result+=parseJSONTextObject(subObj);
						result+=endTag(subObj,it);
					}
				}
			}
			result+=parseJSONTextObject(jsonObj);
			
			return result;
		}