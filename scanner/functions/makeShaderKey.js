function makeShaderKey(program, inputs, output) {
	  var keyInputs = '';
	  inputs.concat(output).forEach(function (x) {
	    var hasOffset = x.texData != null && x.texData.slice != null && x.texData.slice.flatOffset > 0;
	    var texShape = x.isUniform ? 'uniform' : x.texData.texShape;
	    keyInputs += x.shape + "_" + texShape + "_" + hasOffset;
	  });
	  var keyUserCode = program.userCode;
	  var key = program.constructor.name; // Fast string concat. See https://jsperf.com/string-concatenation/14.

	  key += '_' + keyInputs + '_' + keyUserCode;
	  return key;
	}