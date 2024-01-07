function batchSetValue(variablesAndValues) {
	  variablesAndValues.forEach(function (variableAndValue) {
	    var variable = variableAndValue[0];
	    variable.write(variableAndValue[1]);
	  });
	}