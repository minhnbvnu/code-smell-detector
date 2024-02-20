function getJsonPropertyPath(jsonObjPath, jsonPropName) {
			if (jsonObjPath==="") {
				return jsonPropName;
			}
			else
				return jsonObjPath+"."+jsonPropName;
		}