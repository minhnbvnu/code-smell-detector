function getPrecision(step) {
	  var stepString = step.toString();
	  var precision = 0;
	  if (stepString.indexOf('.') >= 0) {
	    precision = stepString.length - stepString.indexOf('.') - 1;
	  }
	  return precision;
	}