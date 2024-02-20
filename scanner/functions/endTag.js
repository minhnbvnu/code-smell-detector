function endTag(jsonObj,elementName) {
			return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
		}