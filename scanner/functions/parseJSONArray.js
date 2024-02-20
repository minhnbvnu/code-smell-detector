function parseJSONArray ( jsonArrRoot, jsonArrObj, attrList, jsonObjPath ) {
			var result = ""; 
			if(jsonArrRoot.length == 0) {
				result+=startTag(jsonArrRoot, jsonArrObj, attrList, true);
			}
			else {
				for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
					result+=startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
					result+=parseJSONObject(jsonArrRoot[arIdx], getJsonPropertyPath(jsonObjPath,jsonArrObj));
					result+=endTag(jsonArrRoot[arIdx],jsonArrObj);
				}
			}
			return result;
		}