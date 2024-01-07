function deserializeInitializer(config, customObjects) {
	  if (customObjects === void 0) {
	    customObjects = {};
	  }

	  return deserializeKerasObject(config, SerializationMap.getMap().classNameMap, customObjects, 'initializer');
	}