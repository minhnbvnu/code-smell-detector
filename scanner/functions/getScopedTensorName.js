function getScopedTensorName(tensorName) {
	  if (!isValidTensorName(tensorName)) {
	    throw new Error('Not a valid tensor name: \'' + tensorName + '\'');
	  }

	  return currentNameScopePrefix() + tensorName;
	}