function gradients(lossFn, variables) {
	  // TODO(cais): The return type signature can be simplified if deeplearn makes
	  //   the corresponding type public.
	  var variableList = variables.map(function (variable) {
	    return variable.read();
	  });
	  var valudAndGrads = variableGrads(lossFn, variableList);
	  return variables.map(function (variable) {
	    return valudAndGrads.grads[variable.name];
	  });
	}