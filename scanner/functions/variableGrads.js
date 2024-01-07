function variableGrads(f, varList) {
	  assert(isFunction(f), function () {
	    return 'The f passed in variableGrads(f) must be a function';
	  });
	  assert(varList == null || Array.isArray(varList) && varList.every(function (v) {
	    return v instanceof Variable;
	  }), function () {
	    return 'The varList passed in variableGrads(f, varList) must be an array ' + 'of variables';
	  });
	  var specifiedVarList = varList != null;

	  if (!specifiedVarList) {
	    // Get all of the trainable variables.
	    varList = [];

	    for (var varName in ENGINE.registeredVariables) {
	      varList.push(ENGINE.registeredVariables[varName]);
	    }
	  }

	  var specifiedNonTrainable = specifiedVarList ? varList.filter(function (variable) {
	    return !variable.trainable;
	  }) : null; // Prune non-trainable variables.

	  var originalVarCount = varList.length;
	  varList = varList.filter(function (variable) {
	    return variable.trainable;
	  });
	  assert(varList.length > 0, function () {
	    return "variableGrads() expects at least one of the input variables to " + ("be trainable, but none of the " + originalVarCount + " variables is ") + "trainable.";
	  });
	  var allowNoGradients = true;

	  var _ENGINE$gradients4 = ENGINE.gradients(f, varList, null, allowNoGradients),
	      value = _ENGINE$gradients4.value,
	      grads = _ENGINE$gradients4.grads;

	  assert(grads.some(function (g) {
	    return g != null;
	  }), function () {
	    return 'Cannot find a connection between any variable and the result of ' + 'the loss function y=f(x). Please make sure the operations that ' + 'use variables are inside the function f passed to minimize().';
	  });
	  assert(value.rank === 0, function () {
	    return "The f passed in variableGrads(f) must return a scalar, but it " + ("returned a rank-" + value.rank + " tensor");
	  });
	  var namedGrads = {};
	  varList.forEach(function (v, i) {
	    if (grads[i] != null) {
	      namedGrads[v.name] = grads[i];
	    }
	  });

	  if (specifiedNonTrainable != null) {
	    // If varList is explicitly provided and contains non-trainable values,
	    // add them to the returned gradients with `null` values.
	    specifiedNonTrainable.forEach(function (v) {
	      return namedGrads[v.name] = null;
	    });
	  }

	  return {
	    value: value,
	    grads: namedGrads
	  };
	}