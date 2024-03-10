function checkObj(instance,objTypeDef,path,additionalProp){

		if(typeof objTypeDef =='object'){
			if(typeof instance != 'object' || instance instanceof Array){
				errors.push({property:path,message:"an object is required"});
			}
			
			for(var i in objTypeDef){ 
				if(objTypeDef.hasOwnProperty(i)){
					var value = instance[i];
					// skip _not_ specified properties
					if (value === undefined && options.existingOnly) continue;
					var propDef = objTypeDef[i];
					// set default
					if(value === undefined && propDef["default"]){
						value = instance[i] = propDef["default"];
					}
					if(options.coerce && i in instance){
						value = instance[i] = options.coerce(value, propDef);
					}
					checkProp(value,propDef,path,i);
				}
			}
		}
		for(i in instance){
			if(instance.hasOwnProperty(i) && !(i.charAt(0) == '_' && i.charAt(1) == '_') && objTypeDef && !objTypeDef[i] && additionalProp===false){
				if (options.filter) {
					delete instance[i];
					continue;
				} else {
					errors.push({property:path,message:(typeof value) + "The property " + i +
						" is not defined in the schema and the schema does not allow additional properties"});
				}
			}
			var requires = objTypeDef && objTypeDef[i] && objTypeDef[i].requires;
			if(requires && !(requires in instance)){
				errors.push({property:path,message:"the presence of the property " + i + " requires that " + requires + " also be present"});
			}
			value = instance[i];
			if(additionalProp && (!(objTypeDef && typeof objTypeDef == 'object') || !(i in objTypeDef))){
				if(options.coerce){
					value = instance[i] = options.coerce(value, additionalProp);
				}
				checkProp(value,additionalProp,path,i);
			}
			if(!_changing && value && value.$schema){
				errors = errors.concat(checkProp(value,value.$schema,path,i));
			}
		}
		return errors;
	}