function parseJSONAttributes ( jsonObj ) {
			var attrList = [];
			if(jsonObj instanceof Object ) {
				for( var ait in jsonObj  ) {
					if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf(config.attributePrefix)==0) {
						attrList.push(ait);
					}
				}
			}
			return attrList;
		}