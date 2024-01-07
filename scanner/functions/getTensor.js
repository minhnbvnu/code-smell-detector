function getTensor(name, tensorsMap, context, resourceManager) {
	  var _parseNodeName = parseNodeName(name),
	      nodeName = _parseNodeName[0],
	      index = _parseNodeName[1];

	  if (resourceManager != null) {
	    var tensor = resourceManager.getHashTableHandleByName(nodeName);

	    if (tensor != null) {
	      return tensor;
	    }
	  }

	  var contextId = context.currentContextIds.find(function (contextId) {
	    return !!tensorsMap[getNodeNameWithContextId(nodeName, contextId)];
	  });
	  return contextId !== undefined ? tensorsMap[getNodeNameWithContextId(nodeName, contextId)][index] : undefined;
	}