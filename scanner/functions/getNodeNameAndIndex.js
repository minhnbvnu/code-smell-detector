function getNodeNameAndIndex(inputName, context) {
	  var _parseNodeName2 = parseNodeName(inputName),
	      nodeName = _parseNodeName2[0],
	      index = _parseNodeName2[1];

	  return [getNodeNameWithContextId(nodeName, context && context.currentContextId), index];
	}