function deserializeRegularizer(config, customObjects) {
	  if (customObjects === void 0) {
	    customObjects = {};
	  }

	  return deserializeKerasObject(config, SerializationMap.getMap().classNameMap, customObjects, 'regularizer');
	}