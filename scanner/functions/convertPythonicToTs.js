function convertPythonicToTs(pythonicConfig, key) {
	  if (pythonicConfig === null) {
	    return null;
	  } else if (typeof pythonicConfig === 'string') {
	    return toCamelCase(pythonicConfig);
	  } else if (typeof pythonicConfig === 'number' || typeof pythonicConfig === 'boolean') {
	    return pythonicConfig;
	  } else if (pythonicConfig instanceof Array) {
	    var tsArray = [];
	    var arrayLength = pythonicConfig.length;

	    for (var i = 0; i < arrayLength; ++i) {
	      var item = pythonicConfig[i];

	      if (isArrayItemInputOrOutputName(key, i, item)) {
	        tsArray.push(item);
	      } else {
	        tsArray.push(convertPythonicToTs(item, key));
	      }
	    }

	    return tsArray;
	  } else {
	    var tsDict = {};

	    for (var _i = 0, _Object$keys = Object.keys(pythonicConfig); _i < _Object$keys.length; _i++) {
	      var pythonicKey = _Object$keys[_i];
	      var pythonicValue = pythonicConfig[pythonicKey];

	      if (pythonicKey === 'name' && typeof pythonicValue === 'string') {
	        // Special case the 'name' key with a string value. Name values, such as
	        // the names of LayersModel and Layer instances, should not undergo the
	        // camel-case conversion.
	        tsDict[pythonicKey] = pythonicValue;
	      } else {
	        var tsKey = toCamelCase(pythonicKey);
	        tsDict[tsKey] = convertPythonicToTs(pythonicValue, tsKey);
	      }
	    }

	    return tsDict;
	  }
	}