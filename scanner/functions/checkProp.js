function checkProp(value, schema, path,i){

		var l;
		path += path ? typeof i == 'number' ? '[' + i + ']' : typeof i == 'undefined' ? '' : '.' + i : i;
		function addError(message){
			errors.push({property:path,message:message});
		}

		if((typeof schema != 'object' || schema instanceof Array) && (path || typeof schema != 'function') && !(schema && getType(schema))){
			if(typeof schema == 'function'){
				if(!(value instanceof schema)){
					addError("is not an instance of the class/constructor " + schema.name);
				}
			}else if(schema){
				addError("Invalid schema/property definition " + schema);
			}
			return null;
		}
		if(_changing && schema.readonly){
			addError("is a readonly field, it can not be changed");
		}
		if(schema['extends']){ // if it extends another schema, it must pass that schema as well
			checkProp(value,schema['extends'],path,i);
		}
		// validate a value against a type definition
		function checkType(type,value){
			if(type){
				if(typeof type == 'string' && type != 'any' &&
						(type == 'null' ? value !== null : typeof value != type) &&
						!(value instanceof Array && type == 'array') &&
						!(value instanceof Date && type == 'date') &&
						!(type == 'integer' && value%1===0)){
					return [{property:path,message:(typeof value) + " value found, but a " + type + " is required"}];
				}
				if(type instanceof Array){
					var unionErrors=[];
					for(var j = 0; j < type.length; j++){ // a union type
						if(!(unionErrors=checkType(type[j],value)).length){
							break;
						}
					}
					if(unionErrors.length){
						return unionErrors;
					}
				}else if(typeof type == 'object'){
					var priorErrors = errors;
					errors = [];
					checkProp(value,type,path);
					var theseErrors = errors;
					errors = priorErrors;
					return theseErrors;
				}
			}
			return [];
		}
		if(value === undefined){
			if(schema.required){
				addError("is missing and it is required");
			}
		}else{
			errors = errors.concat(checkType(getType(schema),value));
			if(schema.disallow && !checkType(schema.disallow,value).length){
				addError(" disallowed value was matched");
			}
			if(value !== null){
				if(value instanceof Array){
					if(schema.items){
						var itemsIsArray = schema.items instanceof Array;
						var propDef = schema.items;
						for (i = 0, l = value.length; i < l; i += 1) {
							if (itemsIsArray)
								propDef = schema.items[i];
							if (options.coerce)
								value[i] = options.coerce(value[i], propDef);
							errors.concat(checkProp(value[i],propDef,path,i));
						}
					}
					if(schema.minItems && value.length < schema.minItems){
						addError("There must be a minimum of " + schema.minItems + " in the array");
					}
					if(schema.maxItems && value.length > schema.maxItems){
						addError("There must be a maximum of " + schema.maxItems + " in the array");
					}
				}else if(schema.properties || schema.additionalProperties){
					errors.concat(checkObj(value, schema.properties, path, schema.additionalProperties));
				}
				if(schema.pattern && typeof value == 'string' && !value.match(schema.pattern)){
					addError("does not match the regex pattern " + schema.pattern);
				}
				if(schema.maxLength && typeof value == 'string' && value.length > schema.maxLength){
					addError("may only be " + schema.maxLength + " characters long");
				}
				if(schema.minLength && typeof value == 'string' && value.length < schema.minLength){
					addError("must be at least " + schema.minLength + " characters long");
				}
				if(typeof schema.minimum !== undefined && typeof value == typeof schema.minimum &&
						schema.minimum > value){
					addError("must have a minimum value of " + schema.minimum);
				}
				if(typeof schema.maximum !== undefined && typeof value == typeof schema.maximum &&
						schema.maximum < value){
					addError("must have a maximum value of " + schema.maximum);
				}
				if(schema['enum']){
					var enumer = schema['enum'];
					l = enumer.length;
					var found;
					for(var j = 0; j < l; j++){
						if(enumer[j]===value){
							found=1;
							break;
						}
					}
					if(!found){
						addError("does not have a value in the enumeration " + enumer.join(", "));
					}
				}
				if(typeof schema.maxDecimal == 'number' &&
					(value.toString().match(new RegExp("\\.[0-9]{" + (schema.maxDecimal + 1) + ",}")))){
					addError("may only have " + schema.maxDecimal + " digits of decimal places");
				}
			}
		}
		return null;
	}