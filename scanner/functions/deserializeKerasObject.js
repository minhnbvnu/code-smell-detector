function deserializeKerasObject(identifier, moduleObjects, customObjects, printableModuleName, fastWeightInit) {
	  if (moduleObjects === void 0) {
	    moduleObjects = {};
	  }

	  if (customObjects === void 0) {
	    customObjects = {};
	  }

	  if (printableModuleName === void 0) {
	    printableModuleName = 'object';
	  }

	  if (fastWeightInit === void 0) {
	    fastWeightInit = false;
	  }

	  // tslint:enable
	  if (typeof identifier === 'string') {
	    var functionName = identifier;
	    var fn;

	    if (functionName in customObjects) {
	      fn = customObjects[functionName];
	    } else if (functionName in _GLOBAL_CUSTOM_OBJECTS) {
	      fn = _GLOBAL_CUSTOM_OBJECTS[functionName];
	    } else {
	      fn = moduleObjects[functionName];

	      if (fn == null) {
	        throw new ValueError("Unknown " + printableModuleName + ": " + identifier + ". " + "This may be due to one of the following reasons:\n" + ("1. The " + printableModuleName + " is defined in Python, in which ") + "case it needs to be ported to TensorFlow.js or your JavaScript " + "code.\n" + ("2. The custom " + printableModuleName + " is defined in JavaScript, ") + "but is not registered properly with " + "tf.serialization.registerClass()."); // TODO(cais): Add link to tutorial page on custom layers.
	      }
	    }

	    return fn;
	  } else {
	    // In this case we are dealing with a Keras config dictionary.
	    var config = identifier;

	    if (config['className'] == null || config['config'] == null) {
	      throw new ValueError(printableModuleName + ": Improper config format: " + (JSON.stringify(config) + ".\n") + "'className' and 'config' must set.");
	    }

	    var className = config['className'];
	    var cls, fromConfig;

	    if (className in customObjects) {
	      var _customObjects$classN = customObjects[className];
	      cls = _customObjects$classN[0];
	      fromConfig = _customObjects$classN[1];
	    } else if (className in _GLOBAL_CUSTOM_OBJECTS) {
	      var _GLOBAL_CUSTOM_OBJECT = _GLOBAL_CUSTOM_OBJECTS['className'];
	      cls = _GLOBAL_CUSTOM_OBJECT[0];
	      fromConfig = _GLOBAL_CUSTOM_OBJECT[1];
	    } else if (className in moduleObjects) {
	      var _moduleObjects$classN = moduleObjects[className];
	      cls = _moduleObjects$classN[0];
	      fromConfig = _moduleObjects$classN[1];
	    }

	    if (cls == null) {
	      throw new ValueError("Unknown " + printableModuleName + ": " + className + ". " + "This may be due to one of the following reasons:\n" + ("1. The " + printableModuleName + " is defined in Python, in which ") + "case it needs to be ported to TensorFlow.js or your JavaScript " + "code.\n" + ("2. The custom " + printableModuleName + " is defined in JavaScript, ") + "but is not registered properly with " + "tf.serialization.registerClass()."); // TODO(cais): Add link to tutorial page on custom layers.
	    }

	    if (fromConfig != null) {
	      // Porting notes: Instead of checking to see whether fromConfig accepts
	      // customObjects, we create a customObjects dictionary and tack it on to
	      // config['config'] as config['config'].customObjects. Objects can use it,
	      // if they want.
	      // tslint:disable-next-line:no-any
	      var customObjectsCombined = {};

	      for (var _i2 = 0, _Object$keys = Object.keys(_GLOBAL_CUSTOM_OBJECTS); _i2 < _Object$keys.length; _i2++) {
	        var key = _Object$keys[_i2];
	        customObjectsCombined[key] = _GLOBAL_CUSTOM_OBJECTS[key];
	      }

	      for (var _i3 = 0, _Object$keys2 = Object.keys(customObjects); _i3 < _Object$keys2.length; _i3++) {
	        var _key = _Object$keys2[_i3];
	        customObjectsCombined[_key] = customObjects[_key];
	      } // Add the customObjects to config


	      var nestedConfig = config['config'];
	      nestedConfig['customObjects'] = customObjectsCombined;
	      var backupCustomObjects = Object.assign({}, _GLOBAL_CUSTOM_OBJECTS);

	      for (var _i4 = 0, _Object$keys3 = Object.keys(customObjects); _i4 < _Object$keys3.length; _i4++) {
	        var _key2 = _Object$keys3[_i4];
	        _GLOBAL_CUSTOM_OBJECTS[_key2] = customObjects[_key2];
	      }

	      convertNDArrayScalarsInConfig(config['config']);
	      var returnObj = fromConfig(cls, config['config'], customObjects, fastWeightInit);
	      _GLOBAL_CUSTOM_OBJECTS = Object.assign({}, backupCustomObjects);
	      return returnObj;
	    } else {
	      // Then `cls` may be a function returning a class.
	      // In this case by convention `config` holds
	      // the kwargs of the function.
	      var _backupCustomObjects = Object.assign({}, _GLOBAL_CUSTOM_OBJECTS);

	      for (var _i5 = 0, _Object$keys4 = Object.keys(customObjects); _i5 < _Object$keys4.length; _i5++) {
	        var _key3 = _Object$keys4[_i5];
	        _GLOBAL_CUSTOM_OBJECTS[_key3] = customObjects[_key3];
	      } // In python this is **config['config'], for tfjs-layers we require
	      // classes that use this fall-through construction method to take
	      // a config interface that mimics the expansion of named parameters.


	      var _returnObj = new cls(config['config']);

	      _GLOBAL_CUSTOM_OBJECTS = Object.assign({}, _backupCustomObjects);
	      return _returnObj;
	    }
	  }
	}