function toArrayAccessForm(obj, childName, path) {
			switch(config.arrayAccessForm) {
				case "property":
					if(!(obj[childName] instanceof Array))
						obj[childName+"_asArray"] = [obj[childName]];
					else
						obj[childName+"_asArray"] = obj[childName];
					break;
				/*case "none":
					break;*/
			}
			
			if(!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
				if(checkInStdFiltersArrayForm(config.arrayAccessFormPaths, obj, childName, path)) {
					obj[childName] = [obj[childName]];
				}			
			}
		}