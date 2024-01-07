function decodeModelAndOptimizerWeights(buffer, specs) {
	  var name2Tensor = decodeWeights(buffer, specs);
	  var modelWeights = {};
	  var optimizerWeights = [];
	  specs.forEach(function (spec) {
	    if (spec.group === 'optimizer') {
	      optimizerWeights.push({
	        name: spec.name,
	        tensor: name2Tensor[spec.name]
	      });
	    } else {
	      modelWeights[spec.name] = name2Tensor[spec.name];
	    }
	  });
	  return {
	    modelWeights: modelWeights,
	    optimizerWeights: optimizerWeights
	  };
	}