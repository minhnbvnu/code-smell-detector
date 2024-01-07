function getParamValue(paramName, node, tensorMap, context, resourceManager) {
	  var inputParam = node.inputParams[paramName];

	  if (inputParam && inputParam.inputIndexStart !== undefined) {
	    var start = inputParam.inputIndexStart;
	    var end = inputParam.inputIndexEnd === 0 ? undefined : inputParam.inputIndexEnd === undefined ? start + 1 : inputParam.inputIndexEnd;

	    if (inputParam.type === 'tensor') {
	      return getTensor(node.inputNames[inputParam.inputIndexStart], tensorMap, context, resourceManager);
	    }

	    if (inputParam.type === 'tensors') {
	      var inputs = node.inputNames.slice(start, end);
	      return inputs.map(function (name) {
	        return getTensor(name, tensorMap, context, resourceManager);
	      });
	    }

	    var tensor = getTensor(node.inputNames.slice(start)[0], tensorMap, context, resourceManager);
	    var data = tensor.dataSync();
	    return inputParam.type === 'number' ? data[0] : toNestedArray(tensor.shape, data);
	  }

	  var attrParam = node.attrParams[paramName];
	  return attrParam && attrParam.value;
	}