function convertNDArrayScalarsInConfig(config) {
	  if (config == null || typeof config !== 'object') {
	    return;
	  } else if (Array.isArray(config)) {
	    config.forEach(function (configItem) {
	      return convertNDArrayScalarsInConfig(configItem);
	    });
	  } else {
	    var fields = Object.keys(config);

	    for (var _i = 0, _fields = fields; _i < _fields.length; _i++) {
	      var field = _fields[_i];
	      var value = config[field];

	      if (value != null && typeof value === 'object') {
	        if (!Array.isArray(value) && value['type'] === 'ndarray' && typeof value['value'] === 'number') {
	          config[field] = value['value'];
	        } else {
	          convertNDArrayScalarsInConfig(value);
	        }
	      }
	    }
	  }
	}