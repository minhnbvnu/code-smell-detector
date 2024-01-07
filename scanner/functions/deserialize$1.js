function deserialize$1(config, customObjects, fastWeightInit) {
	  if (customObjects === void 0) {
	    customObjects = {};
	  }

	  if (fastWeightInit === void 0) {
	    fastWeightInit = false;
	  }

	  return deserializeKerasObject(config, SerializationMap.getMap().classNameMap, customObjects, 'layer', fastWeightInit);
	}