function convertTsToPythonic(tsConfig, key) {
	  if (tsConfig === null || tsConfig === undefined) {
	    return null;
	  } else if (typeof tsConfig === 'string') {
	    return toSnakeCase(tsConfig);
	  } else if (typeof tsConfig === 'number' || typeof tsConfig === 'boolean') {
	    return tsConfig;
	  } else if (tsConfig instanceof Array) {
	    var pyArray = [];
	    var arrayLength = tsConfig.length;

	    for (var i = 0; i < arrayLength; ++i) {
	      var item = tsConfig[i];

	      if (isArrayItemInputOrOutputName(key, i, item)) {
	        pyArray.push(item);
	      } else {
	        pyArray.push(convertTsToPythonic(item, key));
	      }
	    }

	    return pyArray;
	  } else {
	    var pyDict = {};

	    for (var _i2 = 0, _Object$keys2 = Object.keys(tsConfig); _i2 < _Object$keys2.length; _i2++) {
	      var tsKey = _Object$keys2[_i2];
	      var tsValue = tsConfig[tsKey];
	      var pyKey = toSnakeCase(tsKey);

	      if ((tsKey === 'name' || tsKey === 'className') && typeof tsValue === 'string') {
	        // Special case the 'name' key with a string value. Name values, such as
	        // the names of LayersModel and Layer instances, should not undergo the
	        // snake-case conversion.
	        pyDict[pyKey] = tsValue;
	      } else {
	        pyDict[pyKey] = convertTsToPythonic(tsValue, tsKey);
	      }
	    }

	    return pyDict;
	  }
	}